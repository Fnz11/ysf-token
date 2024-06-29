> **IMPORTANT:** *This repo is a work in progress, and contracts have not been audited. Use at your own risk.*

# YasfikToken and Faucet Solidity Project

# Table of Contents
- [YasfikToken](#yasfiktoken-and-faucet-solidity-project)
- [Table of Contents](#table-of-contents)
- [The Methodology](#the-methodology)
- [Examples of Use Cases]()
- [The YasfikToken Contracts](#the-yasfiktoken-contracts)
  - [YasfikToken.sol](#yasfiktokensol)
  - [Faucet.sol](#faucetsol)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Details on the Four Examples](#details-on-the-four-examples)
  - [Token Details](#token-details)
  - [Faucet Details](#faucet-details)
- [Currently Live Examples](#currently-live-examples)
- [What does this unlock?](#what-does-this-unlock)
- [Disclaimer](#disclaimer)
- [Example deployments](#example-deployments)

# The Methodology

YasfikToken is an ERC-20 token with a faucet contract to facilitate testing and development. The token can be used in various decentralized applications and is designed to follow the best practices of ERC-20 standards.

Examples of Use Cases
- Token distribution for decentralized applications
- Reward systems
- Testing and development of smart contracts
- Educational purposes

# The YasfikToken Contracts

In this repo, we will go over the YasfikToken contracts.

1. YasfikToken: YasfikToken.sol
2. Faucet: Faucet.sol

The idea here is to provide a simple, easy-to-use token and faucet system for developers and enthusiasts to utilize in their projects.

## YasfikToken.sol
The YasfikToken contract is a standard ERC-20 implementation with additional functionalities for minting and burning tokens.
- Only the owner can mint new tokens.
- Any user can burn their own tokens.
- Supports standard ERC-20 functionalities: transfer, approve, and transferFrom.

## Faucet.sol
The Faucet contract allows users to request a limited amount of YasfikToken for testing purposes.
- Users can request tokens once every 24 hours.
- The owner can refill the faucet with tokens.
- Designed to support the distribution of tokens for testing and development.

# Getting Started
## Requirements
- git
-- You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- node
-- You'll know you did it right if you can run `node --version` and you see a response like `v16.13.0`
- npm
-- You'll know you did it right if you can run `npm --version` and you see a response like `8.1.0`

## Installation

1. Clone the repo, navigate to the directory, and install dependencies with `npm install`
```
git clone https://github.com/Fnz11/ysf-token
cd ysf-token
npm install
```

## Environment Variables
Create a .env file in the root directory and add the following variables:
```
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url
```

# Details on the Four Examples 

## Token Details
- Name: YasfikToken
- Symbol: YSF
- Decimals: 18
- Total Supply: 1,000,000 YSF (initial supply, can be minted by the owner)

## Faucet Details
The faucet contract is designed to distribute YasfikToken for testing purposes. Users can request tokens once every 24 hours.
- Request Limit: 100 YSF per request
- Refill Functionality: The owner can refill the faucet to ensure continuous distribution of tokens.

# Currently Live Examples
Some good examples of using YasfikToken are:
- DApp Testing: Utilize YasfikToken in your decentralized applications to test various functionalities.
- Educational Purposes: Use YasfikToken to teach and learn about ERC-20 tokens and smart contracts.

# What does this unlock?

Using YasfikToken unlocks a whole new world of decentralized application development. It provides a simple, easy-to-use token and faucet system for developers and enthusiasts to utilize in their projects.

# Disclaimer 

None of the code has been audited or undergone a security review, use at your own risk. If you do create a product with this knowledge, please reach out for a security review/audit.

## Example deployments
- Rinkeby Testnet (Matic Amoy):
  - YasfikToken address: 0x1aD8B2a631551A790Fc64daC7539FCF528Cb7121
  - Faucet address: 0xFD7d5ED62123C0C4043C39A9e335dd90a3eb5153
