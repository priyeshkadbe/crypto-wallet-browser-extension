import React, { ReactNode, useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import { getProvider } from "@/utils/providers";
import {
  comparePassword,
  hashedPassword,
  decryptMnemonic,
  encryptMnemonic,
} from "@/utils/hashingAndEncrypting";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: (enteredPassword: string) => Promise<boolean>;
  logout: () => boolean;
  isPasswordPresent: () => boolean;
  signup: (mnemonics: string, password: string) => Promise<boolean>;
  isSignup: boolean;
  signOut: () => boolean;
  localPassword: string | null;
  wallet: Wallet | null;
  balance: string | null;
  account: string | null;
  network: string | null;
  setNetwork: (value: string | null) => void;
  chainId: number;
  setChainId: (val: number) => void;
  addAccount: () => void;
}

const LoginContext = React.createContext<LoginContextType | null>(null);

interface Props {
  children: ReactNode;
}

interface Wallet {
  address: string;
  publicKey: string;
  privateKey: string;
  mnemonic: string;
}

export const LoginContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const [localPassword, setLocalPassword] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number>(80001);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [mnemonic, setLocalMnemonics] = useState<string | null>(null);
  const [planMnemonic, setPlainMnemonic] = useState<string | null>(null);

  useEffect(() => {
    const pass = Cookies.get("password");
    console.log("localPass", pass);
    const mne = Cookies.get("mnemonic");
    console.log("mne", mne);
    if (pass !== undefined && mne !== undefined) {
      setLocalMnemonics(mne);
      setLocalPassword(pass);
      setSignup(true);
    }
  }, [localPassword, chainId, network, wallet, balance]);

  const isPasswordPresent = () => {
    return Cookies.get("password") !== undefined; // Use Cookies.get instead of localStorage.getItem
  };

  useEffect(() => {
    changeNetwork(chainId!);
  }, [chainId]);

  const changeNetwork = (chainId: number) => {
    setChainId(chainId);
    if (wallet !== null) {
      const provider = new ethers.providers.JsonRpcProvider(
        getProvider(chainId)
      );
      console.log("provider is ", getProvider(chainId));
      provider.getNetwork().then((val) => {
        setNetwork(val.name);
        console.log("logoUrl:", val);
        console.log("provider.getSigner", provider.getSigner());
      });
      provider.getBalance(wallet.address).then((val) => {
        setBalance(ethers.utils.formatEther(val).toString());
      });
    }
  };

  const addAccount = () => {
    // if (wallet && wallet.mnemonic) {
    //   const provider = new ethers.utils.HDNode.fromSeed(
    //     wallet.mnemonic,
    //     "https://mainnet.infura.io/v3/your-project-id"
    //   );
    //   const newWallet = new ethers.Wallet(provider);
    //   if (newWallet.address) {
    //     // Add the new account's address to the list of accounts
    //     setAccounts((prevAccounts) => [...prevAccounts, newWallet.address]);
    //     // You can perform additional actions if needed
    //     console.log("new accounts", newWallet);
    //   }
    // }
  };

  const createWallet = async (mnemonic: string): Promise<boolean> => {
    try {
      if (chainId === null) {
        return false;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        getProvider(chainId)
      );
      console.log("provider is ", getProvider(chainId));
      const wallet = ethers.Wallet.fromMnemonic(mnemonic.toString());

      if (wallet.address) {
        const data = {
          address: wallet.address,
          publicKey: wallet.publicKey,
          privateKey: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        };

        setWallet(data);
        console.log("data is ", data);

        const val = await provider.getNetwork();
        setNetwork(val.name);
        console.log("logoUrl:", val);
        console.log("provider.getSigner", provider.getSigner());

        const balanceVal = await provider.getBalance(wallet.address);
        setBalance(ethers.utils.formatEther(balanceVal));

        //console.log("locWallet", locWallet);
        const locWallet = new ethers.Wallet(wallet.privateKey, provider);

        console.log("loc wallet", locWallet);
        setAccount(locWallet.address);

        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };
  const login = async (enteredPassword: string): Promise<boolean> => {
    try {
      // const hashPassword = hashedPassword(enteredPassword);
      // const storedHashedPassword = Cookies.get("password");
      // const encryptMnemonic = Cookies.get("mnemonic");

      let isPasswordValid = false;
      if (localPassword !== null) {
        isPasswordValid = comparePassword(enteredPassword, localPassword);
      }

      if (mnemonic !== null && localPassword !== null && isPasswordValid) {
        const decryptedMnemonic = decryptMnemonic(mnemonic, enteredPassword);
        console.log("decryptMnemonic", decryptedMnemonic);
        setPlainMnemonic(decryptedMnemonic.toString());
        console.log("planMnemonic", planMnemonic);

        const isWalletCreated = await createWallet(planMnemonic!);

        if (isWalletCreated) {
          setIsLoggedIn(true);
          //  setSignup(true);
          return true;
        }

        return false;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const signup = async (
    mnemonics: string,
    password: string
  ): Promise<boolean> => {
    try {
      const hashPass = hashedPassword(password.toString());
      Cookies.set("password", hashPass, { expires: 365 });

      await encryptMnemonic(mnemonics, password).then((val) => {
        Cookies.set("mnemonic", val.toString(), { expires: 365 });
      });

      const isWalletCreated = await createWallet(mnemonics);

      if (isWalletCreated) {
        setIsLoggedIn(true);
        // setSignup(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const signOut = (): boolean => {
    Cookies.remove("password");
    Cookies.remove("mnemonic");
    setLocalPassword(null);
    setSignup(false);
    setIsLoggedIn(false);
    return true;
  };

  const logout = (): boolean => {
    setIsLoggedIn(false);
    return true;
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    isPasswordPresent,
    signup,
    isSignup,
    signOut,
    localPassword,
    wallet,
    balance,
    account,
    network,
    setNetwork,
    chainId,
    setChainId,
    addAccount,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);

  if (context === null) {
    throw new Error("useLogin must be used within a LoginContextProvider");
  }

  return context;
};

export default LoginContext;
