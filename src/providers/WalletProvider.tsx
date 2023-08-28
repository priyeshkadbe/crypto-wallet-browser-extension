import { ethers } from "ethers";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginProvider";
import { SEPOLIA_PROVIDER } from "@/utils/providers";
interface SetAccountsFunction {
  (
    accounts: Array<{
      account: string;
      public_key: string;
      private_key: string;
    }>
  ): void;
}

interface WalletContextType {
  accounts: Array<{
    account: string;
    public_key: string;
    private_key: string;
  }>;
  balance: string | null;
  network: String | null;
  account: String | null;
}

const WalletContext = React.createContext<WalletContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  const [accounts, setAccounts] = useState<
    Array<{
      account: string;
      public_key: string;
      private_key: string;
    }>
  >([]);

  const [account,setAccount]=useState<string|null>(null)
  const [network, setNetwork] = useState<String | null>(null);
  const [balance, setBalance] = useState<string | null>(null); // Change String to string

  const { wallet } = useLogin();

  useEffect(() => {
    if (wallet !== null) {
      createWallet(wallet.mnemonic)
    }
  },[wallet])

  const createWallet = (mnemonic: string) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_SEPOLIA_PROVIDER
      );
      console.log("pro", process.env.NEXT_PUBLIC_SEPOLIA_PROVIDER);
      const wallet = ethers.Wallet.fromMnemonic(mnemonic.toString());
      const locWallet = new ethers.Wallet(wallet.privateKey, provider);
      console.log("locWallet", locWallet);
      provider.getNetwork().then((val) => {
        setNetwork(val.name)
      });
      provider.getBalance(wallet.address).then((val) => {
        setBalance(ethers.utils.formatEther(val).toString())
      })
      return wallet.address;
    } catch (error) {
      return error;
    }
  };

  const value = {
    accounts,
    balance,
    network,
    account
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWalletState = (): WalletContextType => {
  const context = useContext(WalletContext);

  if (context === null) {
    throw new Error(
      `Received null while calling useContext(WalletContext), did you forget to put the provider ?`
    );
  }

  return context;
};

export default WalletProvider;
