/**
 * Generate src/generated/operations.ts from the vendored Etsy OpenAPI spec.
 *
 *   npm run generate
 *
 * To refresh:
 *   curl -o vendor/etsy-openapi.json https://www.etsy.com/openapi/generated/oas/3.0.0.json
 *   npm run generate && npm test
 *
 * All 105 operations are covered. Etsy's v3 API is entirely seller-facing -
 * there is no admin tier and nothing here a normal Etsy app cannot call, given
 * the right OAuth scopes. What varies is the SCOPES, and that is the useful
 * thing to surface: it turns an unexplained 403 into an actionable one.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildCatalogue, renderCatalogue, reportBuild } from "@nasdigital/mcp-server-core/generate";

const ROOT = new URL("..", import.meta.url).pathname;
const spec = JSON.parse(readFileSync(join(ROOT, "vendor/etsy-openapi.json"), "utf8"));

/**
 * Etsy writes marketing HTML into its descriptions - "General Release" badges,
 * "Report bug" links, anchor tags. Left in, every one of those burns context
 * on every turn for no information at all.
 */
const clean = (s) =>
  String(s ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\bReport bug\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const result = buildCatalogue(spec, {
  stripPrefix: "/v3/application",
  exclusions: [],
  toolFor: () => "etsy_call",
  // GET reads, DELETE removes, everything else edits. Etsy has no chargeable
  // endpoint - it does not take payment through this API - so unlike Printify
  // there is nothing here that costs money to call.
  //
  // One exception, and it is the kind the verb default always gets wrong:
  // POST /v3/application/scopes is a POST that changes nothing. It reports
  // which scopes the CALLING TOKEN holds, which is exactly what you reach for
  // when a 403 arrives - so classifying it a write would have MCP_READ_ONLY
  // refuse the one call that diagnoses a permission problem.
  actionFor: (op) =>
    op.path === "/v3/application/scopes"
      ? "read"
      : op.method === "GET"
        ? "read"
        : op.method === "DELETE"
          ? "destructive"
          : "write",
});

for (const op of result.operations) op.summary = clean(op.summary).slice(0, 180);

const scopeCounts = {};
for (const op of result.operations) for (const s of op.scopes) scopeCounts[s] = (scopeCounts[s] ?? 0) + 1;
const publicOps = result.operations.filter((o) => o.scopes.length === 0).length;
const counts = result.operations.reduce((a, o) => ({ ...a, [o.action]: (a[o.action] ?? 0) + 1 }), {});

const header = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/etsy-openapi.json
 * (${spec.info?.title ?? "Etsy Open API v3"} ${spec.info?.version ?? ""}, OpenAPI ${spec.openapi}).
 *
 * All ${result.operations.length} operations are covered. Etsy's v3 API is entirely seller-facing:
 * no admin tier, nothing an ordinary app cannot call given the right scopes.
 *
 * ${counts.read ?? 0} read, ${counts.write ?? 0} write, ${counts.destructive ?? 0} destructive. ${publicOps} need no OAuth scope at all.
 *
 * The scope on each operation is the load-bearing detail. Of the 13 DELETE
 * endpoints, exactly ONE needs listings_d - deleting a whole live listing -
 * and the other twelve ride on scopes you already hold in order to edit
 * anything. So declining listings_d makes the catastrophic delete impossible
 * at the OAuth layer while leaving every normal operation working.
 */`;

mkdirSync(join(ROOT, "src/generated"), { recursive: true });
writeFileSync(join(ROOT, "src/generated/operations.ts"), renderCatalogue(result, header), "utf8");
reportBuild(result);
console.log(`  by consequence: ${JSON.stringify(counts)}`);
console.log(`  public (no scope): ${publicOps}`);
console.log(`  scopes: ${JSON.stringify(scopeCounts)}`);
