import React, { ReactNode, useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import { getProvider } from "@/utils/providers";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: (enteredPassword: string) => boolean;
  logout: () => boolean;
  isPasswordPresent: () => boolean;
  signup: (mnemonics: string, password: string) => boolean;
  isSignup: boolean;
  signOut: () => boolean;
  localPassword: string | null;
  wallet: Wallet | null;
  balance: string | null;
  account: string | null;
  network: string | null;
  setNetwork: (value: string | null) => void;
  chainId: number | null;
  setChainId: (val: number | null) => void;
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
  const [chainId, setChainId] = useState<number | null>(1);

  useEffect(() => {
    const pass = Cookies.get("password"); // Use Cookies.get instead of localStorage.getItem
    console.log("localPass", pass);
    if (pass !== undefined) {
      setSignup(true);
    }
  }, [localPassword, chainId]);

  const isPasswordPresent = () => {
    return Cookies.get("password") !== undefined; // Use Cookies.get instead of localStorage.getItem
  };

  const createWallet = (mnemonic: string) => {
    try {
      const provider = getProvider(chainId!);

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
      }

      const locWallet = new ethers.Wallet(wallet.privateKey, provider);

      provider.getNetwork().then((val) => {
        setNetwork(val.name);

        console.log("logoUrl:", val);
      });
      provider.getBalance(wallet.address).then((val) => {
        setBalance(ethers.utils.formatEther(val).toString());
      });

      console.log("locWallet", locWallet);
      provider.getNetwork().then((bal) => {
        console.log("balance is :", bal.name);
      });
      return wallet.address;
    } catch (error) {
      return error;
    }
  };

  const login = (enteredPassword: string): boolean => {
    const hashPassword = hashedPassword(enteredPassword);

    const storedHashedPassword = Cookies.get("password"); // Use Cookies.get instead of localStorage.getItem
    const encryptMnemonic = Cookies.get("mnemonic");
    console.log("hashPassword:", hashPassword);
    console.log("storedHashedPassword:", storedHashedPassword);
    const isPasswordValid = comparePassword(enteredPassword, hashPassword);

    if (
      storedHashedPassword !== undefined &&
      encryptMnemonic !== undefined &&
      isPasswordValid
    ) {
      const decryptedMnemonic = decryptMnemonic(
        encryptMnemonic,
        enteredPassword
      );
      const localWallet = ethers.Wallet.fromMnemonic(
        decryptedMnemonic.toString()
      );

      if (localWallet.address) {
        console.log("here data is ", {
          address: localWallet.address,
          publicKey: localWallet.publicKey,
          privateKey: localWallet.privateKey,
          mnemonic: localWallet.mnemonic.phrase,
        });
        setWallet({
          address: localWallet.address,
          publicKey: localWallet.publicKey,
          privateKey: localWallet.privateKey,
          mnemonic: localWallet.mnemonic.phrase,
        });

        return true;
      }
    }

    return false;
  };

  const signup = (mnemonics: string, password: string): boolean => {
    const hashPass = hashedPassword(password.toString());
    Cookies.set("password", hashPass, { expires: 365 }); // Use Cookies.set instead of localStorage.setItem
    createWallet(mnemonics);
    encryptMnemonic(mnemonics, password).then((val) => {
      Cookies.set("mnemonic", val, { expires: 365 });
    });

    const wallet = ethers.Wallet.fromMnemonic(mnemonics);
    if (wallet.address) {
      const data = {
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        mnemonics: wallet.mnemonic.phrase,
      };
      setWallet({
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
      });
      // setAddress(wallet.address);
      encryptMnemonic(JSON.stringify(data), password).then((val) => {
        Cookies.set("wallet", val); // Use Cookies.set instead of localStorage.setItem
        console.log("encryptedWallet", val);
      });

      const wall = Cookies.get("wallet"); // Use Cookies.get instead of localStorage.getItem
      if (wall !== undefined) {
        console.log("decrypted wallet", decryptMnemonic(wall, password));
      }
      console.log("wallet", data);
      return true;
    }
    return false;
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

const comparePassword = (enteredPassword: string, hashedPassword: string) => {
  if (hashedPassword === undefined) {
    return false;
  }
  return bcrypt.compareSync(enteredPassword, hashedPassword);
};

const hashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const decryptMnemonic = (encryptedMnemonic: string, password: string) => {
  return CryptoJS.AES.decrypt(encryptedMnemonic.toString(), password).toString(
    CryptoJS.enc.Utf8
  );
};

const encryptMnemonic = async (mnemonic: string, password: string) => {
  const cipher = CryptoJS.AES.encrypt(JSON.stringify(mnemonic), password);
  const encryptedData = cipher.toString();
  return encryptedData;
};

export default LoginContext;
