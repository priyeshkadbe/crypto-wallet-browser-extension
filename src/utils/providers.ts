import dotenv from "dotenv";
dotenv.config();



export function getProvider(chainId: number) {
  switch (chainId) {
    case 1:
      return process.env.NEXT_PUBLIC_ETHEREUM_PROVIDER;
    case 5:
      return process.env.NEXT_PUBLIC_GOERLI_PROVIDER;
    case 137:
      return process.env.NEXT_PUBLIC_POLYGON_MAINNET_PROVIDER;
    case 80001:
      return process.env.NEXT_PUBLIC_MUMBAI_TESTNET_PROVIDER;
    case 11155111:
      return process.env.NEXT_PUBLIC_SEPOLIA_PROVIDER;
    default:
      return process.env.NEXT_PUBLIC_DEFAULT_PROVIDER;
  }
}

export const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY;

// export const PROVIDERS = [
//   {
//     provider: process.env.NEXT_PUBLIC_SEPOLIA_PROVIDER,
//     chainId: 11155111,
//   },
//   {
//     provider: process.env.NEXT_PUBLIC_GOERLI_PROVIDER,
//     chainId: 5,
//   },

//   {
//     provider: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_PROVIDER,
//     chainId: 1,
//   },

//   {
//     provider: process.env.NEXT_PUBLIC_POLYGON_MAINNET_PROVIDER,
//     chainId: 137,
//   },

//   {
//     provider: process.env.NEXT_PUBLIC_MUMBAI_TESTNET_PROVIDER,
//     chainId: 80001,
//   },
// ];
