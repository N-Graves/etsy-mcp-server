#!/usr/bin/env node
/**
 * etsy-mcp-server — a Model Context Protocol server for the Etsy Open API v3.
 *
 * All 105 published operations are reachable. Etsy's v3 API is entirely
 * seller-facing: there is no admin tier and nothing here an ordinary app
 * cannot call given the right OAuth scopes. What varies is the SCOPES, and
 * that is the thing worth surfacing — see etsy_check_scopes.
 *
 * Authentication, two modes:
 *
 *   Public only:
 *     ETSY_KEYSTRING=...
 *
 *   Seller (OAuth2, refreshes itself):
 *     ETSY_KEYSTRING=...
 *     ETSY_SHARED_SECRET=...
 *     ETSY_CREDENTIALS_FILE=~/.etsy-mcp-credentials
 *       holding ETSY_ACCESS_TOKEN, ETSY_REFRESH_TOKEN, ETSY_TOKEN_EXPIRES_AT,
 *       seeded once from your authorisation flow.
 *
 * Also:
 *   ETSY_SHOP_ID          optional. Defaults the shop_id on the shop tools.
 *   ETSY_BASE_URL         optional. Defaults to https://api.etsy.com
 *   MCP_READ_ONLY=1       refuse anything that changes state.
 *   MCP_NO_DESTRUCTIVE=1  allow writes, refuse deletes.
 *
 * ⚠️  Etsy rotates the refresh token on every refresh. Two processes
 *     refreshing at once break the chain permanently, so it happens under a
 *     lock with an atomic write. See src/auth.ts.
 */

import {
  TokenStore,
  authorizerFromEnv,
  runServer,
} from "@nasdigital/mcp-server-core";
import { homedir } from "node:os";
import { join } from "node:path";
import { apiKeyAuth, authedClient, userAuth, type EtsyAuth } from "./auth.js";
import { buildTools } from "./tools.js";
import { OPERATIONS } from "./generated/operations.js";

const VERSION = "1.0.0";

function resolveAuth(): EtsyAuth {
  const keystring = process.env.ETSY_KEYSTRING;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;

  if (!keystring) {
    throw new Error(
      "No Etsy credentials. Set ETSY_KEYSTRING for public operations, and " +
        "additionally ETSY_SHARED_SECRET plus a credentials file for seller " +
        "access. See the README.",
    );
  }

  if (sharedSecret) {
    const path =
      process.env.ETSY_CREDENTIALS_FILE?.replace(/^~(?=$|\/)/, homedir()) ??
      join(homedir(), ".etsy-mcp-credentials");
    return userAuth({ store: new TokenStore(path), keystring, sharedSecret });
  }

  return apiKeyAuth(keystring);
}

async function main() {
  const auth = resolveAuth();
  const http = authedClient(auth, VERSION);

  await runServer({
    name: "etsy-mcp-server",
    version: VERSION,
    authorizer: authorizerFromEnv(),
    tools: buildTools(http, process.env.ETSY_SHOP_ID),
  });

  console.error(
    `Etsy Open API v3: all ${OPERATIONS.length} operations reachable. ` +
      `Auth: ${auth.describe()}.`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
