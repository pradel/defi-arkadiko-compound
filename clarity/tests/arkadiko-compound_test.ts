import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from "https://deno.land/x/clarinet@v1.1.0/index.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

Clarinet.test({
  name: "Can withdraw any FT token",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let assetMaps = chain.getAssetsMaps();

    console.log(JSON.stringify(assetMaps, null, 2));

    let block = chain.mineBlock([
      Tx.contractCall(
        "arkadiko-compound-v1-1",
        "withdraw-ft",
        [
          types.principal(
            "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-token-wstx-usda"
          ),
          types.uint(10),
        ],
        wallet_deployer.address
      ),
    ]);

    console.log(JSON.stringify(block, null, 2));
  },
});
