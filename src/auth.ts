/**
 * Etsy authentication.
 *
 * ── Two things about Etsy that are not obvious from its docs ───────────────
 *
 * 1. The `x-api-key` header wants BOTH halves — "keystring:shared_secret".
 *    The bare keystring returns 403 on every authenticated call, and the
 *    message reads exactly like a scope refusal ("Shared secret is required
 *    in x-api-key header"), so it sends you hunting for the wrong problem.
 *    Verified live against the real API.
 *
 * 2. Etsy ROTATES the refresh token on every refresh, like X does. The old
 *    one stops working the moment the new one is issued, so losing the new
 *    one breaks the chain permanently and the only fix is re-authorising in
 *    a browser. Two MCP clients running at once is normal, both refresh, and
 *    whichever writes second saves a token Etsy has already invalidated.
 *
 * So the refresh happens inside TokenStore.withLock, re-reads under the lock
 * before spending anything, and writes atomically.
 */

import { HttpClient, TokenStore, ToolError } from "@nasdigital/mcp-server-core";

const TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token";
/** Refresh this far ahead of expiry, so a long call cannot straddle it. */
const SKEW_MS = 5 * 60_000;

export interface EtsyAuth {
  headers(): Promise<Record<string, string>>;
  describe(): string;
}

/**
 * The API key alone. Reaches the 32 public operations — taxonomy, listing
 * lookups, shop and review reads — and nothing else.
 *
 * Etsy's refusal for a private endpoint under this mode is clear, so it is
 * passed through rather than pre-empted here.
 */
export function apiKeyAuth(keystring: string, sharedSecret?: string): EtsyAuth {
  const value = sharedSecret ? `${keystring}:${sharedSecret}` : keystring;
  return {
    headers: async () => ({ "x-api-key": value }),
    describe: () => "API key only (public operations)",
  };
}

/**
 * OAuth2 user context, refreshing itself as needed.
 *
 * The credentials file holds ETSY_ACCESS_TOKEN, ETSY_REFRESH_TOKEN and
 * ETSY_TOKEN_EXPIRES_AT. Seed it once from your authorisation flow.
 */
export function userAuth(opts: {
  store: TokenStore;
  keystring: string;
  sharedSecret: string;
  fetchImpl?: typeof fetch;
}): EtsyAuth {
  const doFetch = opts.fetchImpl ?? globalThis.fetch;

  const stillValid = (creds: Record<string, string>) => {
    if (!creds.ETSY_ACCESS_TOKEN) return false;
    const exp = Number(creds.ETSY_TOKEN_EXPIRES_AT ?? 0);
    // No recorded expiry: assume it needs refreshing, rather than finding out
    // that it did halfway through somebody's work.
    return exp > 0 && Date.now() + SKEW_MS < exp;
  };

  async function refresh(): Promise<string> {
    return opts.store.withLock(async () => {
      // Re-read INSIDE the lock. Another process may have refreshed while
      // this one waited, and refreshing again would spend a current token.
      const creds = opts.store.read();
      if (stillValid(creds)) return creds.ETSY_ACCESS_TOKEN!;

      const refreshToken = creds.ETSY_REFRESH_TOKEN;
      if (!refreshToken) {
        throw new ToolError(
          "No Etsy refresh token is stored, and the access token has expired. " +
            "Re-run your authorisation flow and write ETSY_ACCESS_TOKEN, " +
            "ETSY_REFRESH_TOKEN and ETSY_TOKEN_EXPIRES_AT into the credentials file.",
        );
      }

      const res = await doFetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: opts.keystring,
          refresh_token: refreshToken,
        }),
      });

      if (!res.ok) {
        // The status is reported and the body is not — the same rule the HTTP
        // layer applies everywhere, since provider error bodies echo request
        // context back.
        throw new ToolError(
          `Refreshing the Etsy access token failed (HTTP ${res.status}). ` +
            (res.status === 400 || res.status === 401
              ? "The refresh token has probably already been spent or revoked. " +
                "Etsy rotates it on every refresh, so a stale copy fails this way; " +
                "re-run your authorisation flow."
              : "Try again shortly."),
        );
      }

      const data = (await res.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
      };
      if (!data.access_token) {
        throw new ToolError("Etsy returned no access token when refreshing.");
      }

      opts.store.write({
        ETSY_ACCESS_TOKEN: data.access_token,
        // Rotated on every refresh. Written in the SAME atomic write as the
        // access token — losing it is what breaks the chain permanently.
        ...(data.refresh_token ? { ETSY_REFRESH_TOKEN: data.refresh_token } : {}),
        ETSY_TOKEN_EXPIRES_AT: String(Date.now() + (data.expires_in ?? 3600) * 1000),
      });

      return data.access_token;
    });
  }

  return {
    async headers() {
      const creds = opts.store.read();
      const token = stillValid(creds) ? creds.ETSY_ACCESS_TOKEN! : await refresh();
      return {
        Authorization: `Bearer ${token}`,
        // Both halves. See the header comment.
        "x-api-key": `${opts.keystring}:${opts.sharedSecret}`,
      };
    },
    describe: () => "OAuth2 user context, refreshing automatically",
  };
}

/** Build an HttpClient that authenticates itself. */
export function authedClient(auth: EtsyAuth, version: string): HttpClient {
  return new HttpClient({
    baseUrl: process.env.ETSY_BASE_URL || "https://api.etsy.com",
    headers: { "User-Agent": `etsy-mcp-server/${version}` },
    dynamicHeaders: () => auth.headers(),
    timeoutMs: 30_000,
  });
}
