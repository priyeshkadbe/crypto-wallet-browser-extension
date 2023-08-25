import { ethers } from "ethers";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface WalletContextType {
  mnemonic: string;
  accounts: Array<{
    account: string;
    public_key: string;
    private_key: string;
  }>;
}

const WalletContext = React.createContext<WalletContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  const [mnemonic, setMnemonic] = useState("");
  const [accounts, setAccounts] = useState([]);

  // const fetchWallet = () => {
  //   try {
  //     const { address } = ethers.Wallet.fromMnemonic(mnemonic)
  //     return address
  //   } catch (error) {
  //     return "something went wrong"
  //   }
  // }

  const value = {
    mnemonic,
    setMnemonic,
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
