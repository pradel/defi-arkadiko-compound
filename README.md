# defi-arkadiko-compound

⚠️ This repository is intended for experimental purposes only and should be used at your own risk. It is not meant for production use. Please exercise caution when using the code and do not invest more than you are willing to lose.

## What is this?

This project aims to explore the potential of using Stacks Defi to provide a simple way to automatically compound your DIKO rewards to more LP from the Arkadiko protocol, removing the need to manually do many actions and optimise the yield.

The repository is composed of clarity smart contracts and a simple react web interface to interact with them. The smart contracts can be found in the `clarity` folder and the web interface in the `app` folder.

If you're interested in Defi and yield generation, feel free to contribute your own ideas and suggestions!

## How does it work?

First, you need to deploy the smart contracts for your wallet. Then deposit some STX-USDA LP tokens in the pool. When you call the `compound` function, the smart contracts automate a process that would be quite long to do manually:

1. Claim all the pending DIKO rewards
2. Swap 50% DIKO rewards to USDA
3. Swap 50% DIKO rewards to STX
4. Get STX-USDA LP tokens from the swap
5. Stake the new LP tokens into the pool

## Improvements ideas

Right now the contract needs to be deployed per wallet, but for the best user experience and have lower gas fees, the same contract should work for multiple users.

- multiple users can deposit, maybe use a map type to track the share in the pool
- compound function callable by anyone
- strategist take fee % of DIKO rewards at every compound action
- strategist can pause deposits but not withdrawals, to be used in emergency cases

Some ideas of improvements that could be made on this repo.

- create contract for all the arkadiko pools
- proper testing with Arkadiko contracts
