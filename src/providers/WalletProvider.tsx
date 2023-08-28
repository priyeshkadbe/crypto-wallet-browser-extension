import { ethers } from "ethers";
import React, { ReactNode, useContext, useEffect, useState } from "react";

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
  setAccounts: SetAccountsFunction;
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
  
  const [network,setNetwork]=useState<Number|null>(null)
  
  // const fetchWallet = () => {
  //   try {
  //     const { address } = ethers.Wallet.fromMnemonic(mnemonic)
  //     return address
  //   } catch (error) {
  //     return "something went wrong"
  //   }
  // }

  const value = {
    accounts,
    setAccounts,
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
