import { z } from "zod";
import {
  Dispatcher,
  HttpClient,
  pageSize,
  type ToolDefinition,
} from "@nasdigitaluk/mcp-server-core";
import { OPERATIONS, type CataloguedOperation } from "./generated/operations.js";

export const COVERED = OPERATIONS.filter((o) => o.status === "covered");

export function createDispatcher(http: HttpClient) {
  return new Dispatcher<CataloguedOperation>(http, OPERATIONS, "etsy_list_operations");
}

/** Every scope Etsy's spec mentions, with how many operations need it. */
export function scopeSummary() {
  const counts = new Map<string, number>();
  for (const op of OPERATIONS) for (const s of op.scopes) counts.set(s, (counts.get(s) ?? 0) + 1);
  return {
    public_operations: OPERATIONS.filter((o) => o.scopes.length === 0).length,
    scopes: [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([scope, operations]) => ({ scope, operations })),
  };
}

export function buildTools(http: HttpClient, shopId?: string): ToolDefinition<any>[] {
  const d = createDispatcher(http);

  return [
    {
      name: "etsy_list_operations",
      description:
        `Browse all ${OPERATIONS.length} operations in the Etsy Open API v3. Every one is reachable — ` +
        `Etsy's API is entirely seller-facing. Each entry names the OAuth scope it needs, ` +
        `which is what turns a 403 into something you can act on. Use this to find an ` +
        `operation id for etsy_call.`,
      action: "read",
      input: z.object({
        search: z
          .string()
          .optional()
          .describe("Filter by id, path, tag or summary — try 'listing', 'receipt', 'shipping'."),
      }),
      handler: async ({ search }) => d.browse(search),
    },

    {
      name: "etsy_call",
      description:
        "Call any Etsy operation by id. If it returns 403, check the scope it needs with " +
        "etsy_check_scopes — Etsy's scope refusals read like permission errors.",
      action: "destructive",
      input: z.object({
        operation_id: z.string().min(1),
        params: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
        body: z.unknown().optional(),
      }),
      handler: ({ operation_id, params, body }) => d.call(operation_id, params ?? {}, body),
    },

    {
      name: "etsy_check_scopes",
      description:
        "Which OAuth scopes the Etsy API needs, and what each one unlocks. Useful before " +
        "authorising an app, and the fastest way to understand a 403. Pass an operation id " +
        "to see what one call needs; pass held=true to ask Etsy what your token actually " +
        "carries. The two together are what turn a 403 into a fix.",
      action: "read",
      input: z.object({
        operation_id: z
          .string()
          .optional()
          .describe("Report on a single operation instead of the whole API."),
        held: z
          .boolean()
          .optional()
          .default(false)
          .describe("Ask Etsy which scopes the current token holds. Needs a seller token."),
      }),
      handler: async ({ operation_id, held }) => {
        if (operation_id) {
          const op = d.resolve(operation_id);
          const needs = {
            operation: op.id,
            route: `${op.method} ${op.path}`,
            scopes: op.scopes,
            note: op.scopes.length
              ? `Your token must carry ${op.scopes.join(" and ")}.`
              : "Public — no OAuth scope required.",
          };
          if (!held) return needs;
          // The pairing is the point: what it needs, beside what you have.
          const mine = await http.post("/v3/application/scopes");
          return { ...needs, token_holds: mine };
        }
        if (held) return { token_holds: await http.post("/v3/application/scopes") };
        const summary = scopeSummary();
        return {
          ...summary,
          note:
            "Of the 13 DELETE operations, exactly ONE needs listings_d: deleting a whole " +
            "live listing. The other twelve ride on scopes you already hold in order to " +
            "edit anything at all. So declining listings_d makes the one catastrophic " +
            "delete impossible at the OAuth layer while leaving normal work untouched.",
        };
      },
    },

    {
      name: "etsy_get_me",
      description: "The authenticated Etsy user, including their user_id and shop_id.",
      action: "read",
      input: z.object({}),
      handler: () => http.get("/v3/application/users/me"),
    },

    {
      name: "etsy_list_listings",
      description: "Listings in a shop, filtered by state.",
      action: "read",
      input: z.object({
        shop_id: shopId
          ? z.union([z.string(), z.number()]).optional().describe(`Defaults to ETSY_SHOP_ID (${shopId}).`)
          : z.union([z.string(), z.number()]).describe("Your shop id. etsy_get_me returns it."),
        state: z.enum(["active", "inactive", "sold_out", "draft", "expired"]).optional(),
        limit: pageSize(100, 25),
        offset: z.number().int().min(0).optional().default(0),
      }),
      handler: ({ shop_id, state, limit, offset }) =>
        http.get(`/v3/application/shops/${shop_id ?? shopId}/listings`, { state, limit, offset }),
    },

    {
      name: "etsy_get_listing",
      description: "One listing in full. Public — works without a seller token.",
      action: "read",
      input: z.object({
        listing_id: z.union([z.string(), z.number()]),
        includes: z
          .string()
          .optional()
          .describe("Comma-separated, e.g. Images,Shop,Inventory,Videos."),
      }),
      handler: ({ listing_id, includes }) =>
        http.get(`/v3/application/listings/${listing_id}`, { includes }),
    },

    {
      name: "etsy_list_receipts",
      description: "Orders in a shop. Needs transactions_r.",
      action: "read",
      input: z.object({
        shop_id: shopId
          ? z.union([z.string(), z.number()]).optional()
          : z.union([z.string(), z.number()]),
        limit: pageSize(100, 25),
        offset: z.number().int().min(0).optional().default(0),
        was_shipped: z.boolean().optional(),
        was_paid: z.boolean().optional(),
      }),
      handler: ({ shop_id, ...q }) =>
        http.get(`/v3/application/shops/${shop_id ?? shopId}/receipts`, q as Record<string, string>),
    },
  ];
}
