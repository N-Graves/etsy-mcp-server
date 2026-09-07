# etsy-mcp-server

A [Model Context Protocol](https://modelcontextprotocol.io) server for the **Etsy Open API v3**.

**All 105 published operations are reachable.** Nothing is excluded, because there is nothing to exclude — Etsy's v3 API is entirely seller-facing, with no admin tier and no endpoint an ordinary app is structurally barred from. What varies is the **OAuth scopes**, and that is what this server surfaces.

MIT licensed.

## Install

```bash
npm install -g @nasdigitaluk/etsy-mcp
```

## Authentication

Two modes. Pick one.

**API key** — the 32 public operations (taxonomy, listing lookups, shop and review reads):

```json
{ "env": { "ETSY_KEYSTRING": "your-keystring" } }
```

**Seller** — everything, and it refreshes itself:

```json
{
  "env": {
    "ETSY_KEYSTRING": "your-keystring",
    "ETSY_SHARED_SECRET": "your-shared-secret",
    "ETSY_CREDENTIALS_FILE": "~/.etsy-mcp-credentials",
    "ETSY_SHOP_ID": "12345678"
  }
}
```

Seed the credentials file once from your authorisation flow:

```
ETSY_ACCESS_TOKEN=...
ETSY_REFRESH_TOKEN=...
ETSY_TOKEN_EXPIRES_AT=1757260800000
```

`ETSY_SHOP_ID` is optional; it just defaults the `shop_id` argument on the shop tools.

## Two things about Etsy that cost real time to discover

**1. `x-api-key` wants both halves — `keystring:shared_secret`.** The bare keystring returns 403 on every authenticated call, and the message reads exactly like a scope refusal: *"Shared secret is required in x-api-key header."* That sends you hunting through your app's scope grants for a problem that is in a header. This server always sends both.

**2. Etsy rotates the refresh token on every refresh.** The old one stops working the moment the new one is issued, so losing the new one breaks the chain permanently — the only fix is re-authorising in a browser. Running two MCP clients at once is completely normal; both refresh, both spend the same token, and whichever writes second saves one Etsy has already invalidated.

Here the refresh happens inside an **exclusive lock**, **re-reads under the lock** before spending anything (another process may have already done the work while this one waited), and the write is **atomic** (temp file, `fsync`, rename). There is a test asserting that three concurrent callers cause exactly **one** refresh.

## Scopes are the interesting part

Etsy's access control is entirely scope-shaped, and the scope table has one property worth knowing before you authorise anything:

> **Of the 13 DELETE operations, exactly ONE needs `listings_d` — deleting a whole live listing. The other twelve ride on scopes you already hold in order to edit anything at all.**

So declining `listings_d` makes the single catastrophic delete **impossible at the OAuth layer** while leaving every normal operation working. No other operation, of any method, needs it.

`etsy_check_scopes` reports this: what the whole API needs, what one operation needs, and — with `held: true` — what your token actually carries. The two together are what turn a 403 into a fix rather than a guess.

Scope distribution across the 105 operations:

| Scope | Operations |
|---|---|
| *(none — public)* | 32 |
| `shops_w` | 21 |
| `listings_w` | 16 |
| `transactions_r` | 12 |
| `shops_r` | 11 |
| `listings_r` | 7 |
| `address_r` | 3 |
| `transactions_w` | 2 |
| `email_r` | 1 |
| `listings_d` | **1** |

## Tools

Seven tools for 105 operations. Every tool name and description is paid for in the model's context window on every turn, used or not — 105 tools would not be a tool list, it would be a catalogue with worse ergonomics.

| Tool | |
|---|---|
| `etsy_list_operations` | Browse the catalogue. Start here. |
| `etsy_call` | Call any operation by id. |
| `etsy_check_scopes` | What a call needs, and what your token holds. |
| `etsy_get_me` | The authenticated user, including `shop_id`. |
| `etsy_list_listings` | Listings in a shop, by state. |
| `etsy_get_listing` | One listing in full. Public. |
| `etsy_list_receipts` | Orders. Needs `transactions_r`. |

Of 105 operations: **64 read, 28 write, 13 destructive**.

## Read-only and no-destructive modes

```
MCP_READ_ONLY=1       refuse anything that changes state
MCP_NO_DESTRUCTIVE=1  allow writes, refuse deletes
```

⚠️ Worth knowing: `etsy_call` is one door onto all 105 operations, 13 of which are deletes, so it is classified **destructive** and `MCP_READ_ONLY=1` refuses it outright. The dedicated read tools stay usable in that mode — including `etsy_check_scopes`, because Etsy's scope-introspection endpoint is a `POST` that changes nothing and is deliberately classified a read. Classifying it by its verb would have read-only mode refuse the one call that diagnoses a permission problem.

## Refreshing the catalogue

```bash
curl -o vendor/etsy-openapi.json https://www.etsy.com/openapi/generated/oas/3.0.0.json
npm run generate && npm test
```

The coverage test fails if Etsy publishes an operation the catalogue does not carry, so a stale catalogue is loud rather than silent.

## Testing

```bash
npm test                                    # 24 tests, incl. the refresh-concurrency one
SMOKE_ENV='{"ETSY_KEYSTRING":"x"}' npm run smoke   # real MCP over stdio
```

## Built on

[`@nasdigitaluk/mcp-server-core`](https://github.com/N-Graves/mcp-server-core).

## Licence

MIT.
