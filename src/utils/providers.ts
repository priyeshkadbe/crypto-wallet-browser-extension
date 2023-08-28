import dotenv from "dotenv";
dotenv.config();

export const SEPOLIA_PROVIDER = {
  provider:process.env.SEPOLIA_PROVIDER,
  chainId: 11155111,
};

export const GOERLI_PROVIDER = {
  provider: process.env.GOERLI_PROVIDER,
  chainId: 5,
};

export const ETHEREUM_MAINNET_PROVIDER = {
  provider: process.env.ETHEREUM_MAINNET_PROVIDER,
  chainId: 1,
};

export const POLYGON_MAINNET_PROVIDER = {
  provider: process.env.POLYGON_MAINNET_PROVIDER,
  chainId: 137,
};

export const MUMBAI_TESTNET_PROVIDER = {
  provider: process.env.MUMBAI_TESTNET_PROVIDER,
  chainId: 80001,
};
