import { useEffect, useState } from "react";
import { useAccount, useOpenContractCall } from "@micro-stacks/react";
import {
  uintCV,
  contractPrincipalCV,
  cvToJSON,
  boolCV,
} from "micro-stacks/clarity";
import { callReadOnlyFunction } from "micro-stacks/api";
import { PostConditionMode } from "micro-stacks/transactions";
import { useQuery } from "@tanstack/react-query";
import { WalletConnectButton } from "../components/wallet-connect-button";

const microToReadable = (amount: number | string, decimals = 6) => {
  return parseFloat(`${amount}`) / Math.pow(10, decimals);
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { stxAddress } = useAccount();
  const { openContractCall } = useOpenContractCall();

  const contractName = "arkadiko-compound-v1-1";

  /**
   * Get the current address stake amount in the pool
   */
  const { data: stakeAmount } = useQuery<number>({
    queryKey: ["stake-amount", stxAddress],
    queryFn: async () => {
      if (!stxAddress) {
        return null;
      }
      const dikoUsdaPendingRewardsCall = await callReadOnlyFunction({
        contractAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
        contractName: "arkadiko-stake-pool-wstx-usda-v1-1",
        functionName: "get-stake-amount-of",
        functionArgs: [contractPrincipalCV(stxAddress, contractName)],
      });
      return cvToJSON(dikoUsdaPendingRewardsCall).value;
    },
  });

  /**
   * Get the current address pending rewards in the pool
   */
  const { data: pendingRewards } = useQuery<number>({
    queryKey: ["pending-rewards", stxAddress],
    queryFn: async () => {
      if (!stxAddress) {
        return null;
      }
      const dikoUsdaPendingRewardsCall = await callReadOnlyFunction({
        contractAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
        contractName: "arkadiko-stake-pool-wstx-usda-v1-1",
        functionName: "get-pending-rewards",
        functionArgs: [
          contractPrincipalCV(
            "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
            "arkadiko-stake-registry-v1-1"
          ),
          contractPrincipalCV(stxAddress, contractName),
        ],
      });
      return cvToJSON(dikoUsdaPendingRewardsCall).value.value;
    },
  });

  const handleStake = async () => {
    if (!stxAddress) {
      return null;
    }
    await openContractCall({
      contractAddress: stxAddress,
      contractName,
      functionName: "stake",
      functionArgs: [
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-stake-registry-v1-1"
        ),
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-stake-pool-wstx-usda-v1-1"
        ),
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-swap-token-wstx-usda"
        ),
        uintCV(15000000),
        boolCV(true),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: async (data) => {
        console.log("finished contract call!", data);
      },
      onCancel: () => {
        console.log("popup closed!");
      },
    });
  };

  const handleUnstake = async () => {
    if (!stxAddress) {
      return null;
    }
    await openContractCall({
      contractAddress: stxAddress,
      contractName,
      functionName: "unstake",
      functionArgs: [
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-stake-registry-v1-1"
        ),
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-stake-pool-wstx-usda-v1-1"
        ),
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-swap-token-wstx-usda"
        ),
        uintCV(15000000),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: async (data) => {
        console.log("finished contract call!", data);
      },
      onCancel: () => {
        console.log("popup closed!");
      },
    });
  };

  const handleWithdraw = async () => {
    if (!stxAddress) {
      return null;
    }
    await openContractCall({
      contractAddress: stxAddress,
      contractName,
      functionName: "withdraw-ft",
      functionArgs: [
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-token"
        ),
        uintCV(88),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: async (data) => {
        console.log("finished contract call!", data);
      },
      onCancel: () => {
        console.log("popup closed!");
      },
    });
  };

  const handleCompound = async () => {
    if (!stxAddress) {
      return null;
    }
    await openContractCall({
      contractAddress: stxAddress,
      contractName,
      functionName: "compound",
      functionArgs: [
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-stake-registry-v1-1"
        ),
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-stake-pool-wstx-usda-v1-1"
        ),
        contractPrincipalCV(
          "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
          "arkadiko-swap-token-wstx-usda"
        ),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: async (data) => {
        console.log("finished contract call!", data);
      },
      onCancel: () => {
        console.log("popup closed!");
      },
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <WalletConnectButton />

      <button onClick={handleStake}>Stake</button>

      <button onClick={handleUnstake}>Unstake</button>

      <button onClick={handleWithdraw}>Withdraw</button>

      <button onClick={handleCompound}>Compound</button>

      <div>
        Stake amount:{" "}
        {stakeAmount
          ? microToReadable(stakeAmount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })
          : "..."}{" "}
        LP
      </div>

      <div>
        Pending:{" "}
        {pendingRewards
          ? microToReadable(pendingRewards).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })
          : "..."}{" "}
        DIKO
      </div>
    </div>
  );
}
