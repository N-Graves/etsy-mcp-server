import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  HttpClient,
  TokenStore,
  checkCoverage,
  formatCoverage,
  operationsFromOpenApi,
} from "@nasdigital/mcp-server-core";
import { OPERATIONS } from "../src/generated/operations.js";
import { buildTools, createDispatcher, scopeSummary, COVERED } from "../src/tools.js";
import { userAuth, apiKeyAuth } from "../src/auth.js";

const spec = JSON.parse(
  readFileSync(join(import.meta.dirname, "../vendor/etsy-openapi.json"), "utf8"),
);

function client() {
  const calls: { url: string; method: string; headers: Record<string, string> }[] = [];
  const http = new HttpClient({
    baseUrl: "https://api.etsy.com",
    fetchImpl: (async (url: string, opts: RequestInit = {}) => {
      calls.push({
        url,
        method: opts.method ?? "GET",
        headers: (opts.headers ?? {}) as Record<string, string>,
      });
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }) as unknown as typeof fetch,
  });
  return { http, calls };
}

const toolNamed = (http: HttpClient, name: string, shopId?: string) =>
  buildTools(http, shopId).find((t) => t.name === name)!;

describe("coverage", () => {
  it("accounts for every operation Etsy publishes", () => {
    const report = checkCoverage(OPERATIONS, operationsFromOpenApi(spec));
    expect(report.ok, formatCoverage(report)).toBe(true);
  });

  it("excludes nothing, because Etsy's API is entirely seller-facing", () => {
    // Unlike Forem (admin endpoints nobody outside the instance can call) or X
    // (streams that can never return from a tool call), there is no operation
    // here an ordinary app is structurally barred from. Scopes vary; access
    // does not.
    expect(COVERED).toHaveLength(OPERATIONS.length);
    expect(OPERATIONS.filter((o) => o.status === "excluded")).toHaveLength(0);
  });

  it("classifies consequence rather than HTTP verb", () => {
    const byAction = OPERATIONS.reduce<Record<string, number>>(
      (a, o) => ({ ...a, [o.action]: (a[o.action] ?? 0) + 1 }),
      {},
    );
    expect(byAction).toEqual({ read: 64, write: 28, destructive: 13 });
  });

  it("treats the scope-introspection POST as a read, because it changes nothing", () => {
    // The verb default gets this one wrong, and gets it wrong expensively:
    // POST /v3/application/scopes reports which scopes the calling token holds,
    // which is exactly what you reach for when a 403 arrives. Classified a
    // write, MCP_READ_ONLY would refuse the one call that diagnoses a
    // permission problem.
    const op = OPERATIONS.find((o) => o.path === "/v3/application/scopes")!;
    expect(op.method).toBe("POST");
    expect(op.action).toBe("read");
  });
});

describe("scopes", () => {
  it("gates exactly ONE delete behind listings_d", () => {
    // The load-bearing fact about this provider, and the reason scopes are
    // surfaced at all: of the thirteen DELETE endpoints, only deleting a whole
    // live listing needs listings_d. The other twelve ride on scopes you
    // already hold to edit anything at all - so declining listings_d makes the
    // one catastrophic delete impossible at the OAuth layer while leaving
    // every normal operation working.
    const deletes = OPERATIONS.filter((o) => o.method === "DELETE");
    expect(deletes).toHaveLength(13);

    const gated = deletes.filter((o) => o.scopes.includes("listings_d"));
    expect(gated.map((o) => o.path)).toEqual(["/v3/application/listings/{listing_id}"]);

    // And it is not merely rare - no non-delete operation needs it either, so
    // withholding it costs nothing else.
    expect(OPERATIONS.filter((o) => o.scopes.includes("listings_d"))).toHaveLength(1);
  });

  it("reports which operations need no scope at all", () => {
    const summary = scopeSummary();
    expect(summary.public_operations).toBe(32);
    // Every public operation is a read. A write that claimed to need no scope
    // would mean the spec's security block had been misread.
    const pub = OPERATIONS.filter((o) => o.scopes.length === 0);
    expect(pub.every((o) => o.action === "read")).toBe(true);
  });

  it("answers for a single operation, which is what turns a 403 into a fix", () => {
    const { http } = client();
    const tool = toolNamed(http, "etsy_check_scopes");
    return expect(tool.handler({ operation_id: "deleteListing" })).resolves.toMatchObject({
      scopes: ["listings_d"],
    });
  });

  it("can pair what an operation needs with what the token holds", async () => {
    // Either half alone leaves you guessing. The pairing is the diagnosis.
    const { http, calls } = client();
    const res = (await toolNamed(http, "etsy_check_scopes").handler({
      operation_id: "deleteListing",
      held: true,
    })) as { scopes: string[]; token_holds: unknown };
    expect(res.scopes).toEqual(["listings_d"]);
    expect(calls[0]!.url).toContain("/v3/application/scopes");
    expect(calls[0]!.method).toBe("POST");
  });

  it("says PUBLIC rather than 'unknown' when an operation needs no scope", async () => {
    // An empty scope list has two possible readings, and reporting the wrong
    // one sends somebody hunting for a permission that does not exist.
    const { http } = client();
    const res = (await toolNamed(http, "etsy_check_scopes").handler({
      operation_id: "getListing",
    })) as { note: string };
    expect(res.note).toMatch(/public/i);
  });
});

describe("tools", () => {
  it("advertises a small surface for a large API", () => {
    // 105 operations behind 7 tools. Every tool name and description is paid
    // for in the context window on every turn, used or not.
    const names = buildTools(client().http).map((t) => t.name);
    expect(names).toHaveLength(7);
    expect(new Set(names).size).toBe(7);
  });

  it("dispatches a catalogued operation to its real route", async () => {
    const { http, calls } = client();
    await createDispatcher(http).call("getListing", { listing_id: 42 });
    expect(calls[0]!.url).toContain("/v3/application/listings/42");
  });

  it("names a missing path parameter instead of sending a literal brace", async () => {
    const { http, calls } = client();
    await expect(createDispatcher(http).call("getListing", {})).rejects.toThrow(/listing_id/);
    expect(calls).toHaveLength(0);
  });

  it("suggests near matches for a mistyped operation id", async () => {
    const { http } = client();
    await expect(createDispatcher(http).call("getListin")).rejects.toThrow(/did you mean/i);
  });

  it("defaults the shop id when ETSY_SHOP_ID is set", async () => {
    const { http, calls } = client();
    await toolNamed(http, "etsy_list_listings", "777").handler({ limit: 25, offset: 0 });
    expect(calls[0]!.url).toContain("/shops/777/listings");
  });

  it("still requires a shop id when there is no default", () => {
    const { http } = client();
    const tool = toolNamed(http, "etsy_list_listings");
    expect(tool.input.safeParse({}).success).toBe(false);
  });

  it("classifies the generic caller as destructive, because it can reach a delete", () => {
    // etsy_call is one door onto 105 operations, 13 of which are deletes, so
    // MCP_READ_ONLY has to refuse it. The dedicated read tools stay usable.
    const tools = buildTools(client().http);
    expect(tools.find((t) => t.name === "etsy_call")!.action).toBe("destructive");
    expect(tools.find((t) => t.name === "etsy_list_operations")!.action).toBe("read");
    expect(tools.find((t) => t.name === "etsy_check_scopes")!.action).toBe("read");
  });
});

describe("OAuth2 refresh", () => {
  let dir: string;
  let store: TokenStore;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "etsy-auth-"));
    store = new TokenStore(join(dir, "creds"));
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const fakeToken = (n: number) =>
    (async () =>
      new Response(
        JSON.stringify({ access_token: `at${n}`, refresh_token: `rt${n}`, expires_in: 3600 }),
        { status: 200, headers: { "content-type": "application/json" } },
      )) as unknown as typeof fetch;

  const auth = (fetchImpl?: typeof fetch) =>
    userAuth({ store, keystring: "key", sharedSecret: "secret", fetchImpl });

  it("sends BOTH halves in x-api-key", async () => {
    // The bare keystring 403s on every authenticated call with a message that
    // reads exactly like a scope refusal. Verified live.
    store.write({
      ETSY_ACCESS_TOKEN: "current",
      ETSY_REFRESH_TOKEN: "r",
      ETSY_TOKEN_EXPIRES_AT: String(Date.now() + 3_600_000),
    });
    expect(await auth().headers()).toEqual({
      Authorization: "Bearer current",
      "x-api-key": "key:secret",
    });
  });

  it("uses the stored token while it is still valid", async () => {
    store.write({
      ETSY_ACCESS_TOKEN: "current",
      ETSY_REFRESH_TOKEN: "r",
      ETSY_TOKEN_EXPIRES_AT: String(Date.now() + 3_600_000),
    });
    let refreshed = false;
    const headers = await auth(
      (async () => {
        refreshed = true;
        return new Response("{}");
      }) as unknown as typeof fetch,
    ).headers();
    expect(headers.Authorization).toBe("Bearer current");
    expect(refreshed).toBe(false);
  });

  it("persists the ROTATED refresh token", async () => {
    // Etsy invalidates the old one on every use. Keeping the stale copy means
    // the next refresh fails with invalid_grant, permanently.
    store.write({
      ETSY_ACCESS_TOKEN: "old",
      ETSY_REFRESH_TOKEN: "old-refresh",
      ETSY_TOKEN_EXPIRES_AT: String(Date.now() - 1000),
    });
    await auth(fakeToken(1)).headers();
    expect(store.read().ETSY_REFRESH_TOKEN).toBe("rt1");
    expect(store.read().ETSY_ACCESS_TOKEN).toBe("at1");
  });

  it("refreshes ahead of expiry so a call cannot straddle it", async () => {
    store.write({
      ETSY_ACCESS_TOKEN: "nearly-done",
      ETSY_REFRESH_TOKEN: "r",
      ETSY_TOKEN_EXPIRES_AT: String(Date.now() + 2 * 60_000),
    });
    const headers = await auth(fakeToken(2)).headers();
    expect(headers.Authorization).toBe("Bearer at2");
  });

  it("spends the refresh token only ONCE across concurrent callers", async () => {
    // Two MCP clients at once is normal. Both refresh, both spend the same
    // rotating token, and whichever writes second saves one Etsy has already
    // invalidated.
    store.write({
      ETSY_ACCESS_TOKEN: "old",
      ETSY_REFRESH_TOKEN: "old-refresh",
      ETSY_TOKEN_EXPIRES_AT: String(Date.now() - 1000),
    });
    let refreshes = 0;
    const a = auth((async () => {
      refreshes++;
      await new Promise((r) => setTimeout(r, 20));
      return new Response(
        JSON.stringify({ access_token: "at", refresh_token: "rt", expires_in: 3600 }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }) as unknown as typeof fetch);

    await Promise.all([a.headers(), a.headers(), a.headers()]);
    expect(refreshes).toBe(1);
  });

  it("explains a spent refresh token rather than echoing Etsy's error body", async () => {
    store.write({
      ETSY_ACCESS_TOKEN: "old",
      ETSY_REFRESH_TOKEN: "spent",
      ETSY_TOKEN_EXPIRES_AT: String(Date.now() - 1000),
    });
    const failing = (async () =>
      new Response('{"error":"invalid_grant","error_description":"secret detail"}', {
        status: 400,
      })) as unknown as typeof fetch;
    await expect(auth(failing).headers()).rejects.toThrow(/rotates it on every refresh/);
    await expect(auth(failing).headers()).rejects.not.toThrow(/secret detail/);
  });

  it("says what to do when there is no refresh token at all", async () => {
    store.write({ ETSY_ACCESS_TOKEN: "old", ETSY_TOKEN_EXPIRES_AT: String(Date.now() - 1000) });
    await expect(auth(fakeToken(3)).headers()).rejects.toThrow(/authorisation flow/);
  });

  it("api-key auth needs no file and never refreshes", async () => {
    expect(await apiKeyAuth("key").headers()).toEqual({ "x-api-key": "key" });
  });
});
