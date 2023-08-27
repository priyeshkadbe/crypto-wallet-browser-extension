import React, { ReactNode, useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import localforage from "localforage";
import { ethers } from "ethers";
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
  address: string | null;
}

const LoginContext = React.createContext<LoginContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const LoginContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isSignup, setSignup] = useState(false);
  const [localPassword, setLocalPassword] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  // const [publicKey, setPublicKey] = useState<string | null>(null);
  // const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const pass = localStorage.getItem("password");
    console.log("localPass", pass);
    if (pass !== null) {
      setSignup(true);
    }
  }, [localPassword]);

  const isPasswordPresent = () => {
    return localStorage.getItem("password") !== null;
  };

  const createWallet = (mnemonic: string) => {
    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic.toString());
      // return {
      //   address: wallet.address,
      //   publicKey: wallet.publicKey,
      //   privateKey: wallet.privateKey,
      // };
      setAddress(wallet.address);
      return wallet.address;
    } catch (error) {
      return error;
    }
  };

  // const login = (enteredPassword: string): boolean => {
  //   // console.log("local password", localPassword);
  //   console.log("enteredPassword", enteredPassword);
  //   const getPass = localStorage.getItem("password");
  //   const mnemonics = localStorage.getItem("mnemonic");
  //   console.log("getpass", getPass);
  //   console.log("mne", mnemonics);
  //   if (getPass === enteredPassword) {
  //     const wallet = createWallet(mnemonics?.toString());
  //      console.log("wallet", wallet);
  //     setIsLoggedIn(true);
  //     return true;
  //   }
  //   return false;
  // };

  const login = (enteredPassword: string): boolean => {
    const getPass = localStorage.getItem("password");

    if (getPass !== null) {
      console.log("hashed is ", hashedPassword(getPass.toString()));
    }
    if (
      getPass === null ||
      !comparePassword(getPass, enteredPassword.toString())
    ) {
      return false;
    }

    return true;
  };

  const signup = (mnemonics: string, password: string): boolean => {
    const pass = hashedPassword(password);
    console.log("pass",pass)
    localStorage.setItem("password", pass);
    //setLocalPassword(localStorage.getItem("password"));
    //console.log("password setted",localStorage.getItem('password'))
    //const encryptedMnemonic = encryptMnemonic(mnemonics, password);
    // console.log("encryptMnemonic",)

    // localStorage.setItem("mnemonic", encryptedMnemonic);
    encryptMnemonic(mnemonics, password).then((val) => {
      localStorage.setItem("mnemonic", val);
      console.log("encryptMnemonic", val);
      console.log("local mnei", localStorage.getItem("mnemonic"));
    });

    if (login(password)) {
      const wallet = createWallet(mnemonics.toString());
      console.log("wallet", wallet);
      return true;
    }
    //setIsLoggedIn(true)
    return true;
  };

  const signOut = (): boolean => {
    localStorage.removeItem("password");
    localStorage.removeItem("mnemonic");
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
    address,
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

const comparePassword = (enteredPassword: string, hashedPassword?: string) => {
  if (hashedPassword === undefined) {
    return false;
  }

  return bcrypt.compareSync(enteredPassword, hashedPassword);
};

const hashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const decryptMnemonic = (encryptedMnemonic: string, password: string) => {
  return CryptoJS.AES.decrypt(encryptedMnemonic, password).toString(
    CryptoJS.enc.Utf8
  );
};

const encryptMnemonic = async (mnemonic: string, password: string) => {
  const cipher = CryptoJS.AES.encrypt(mnemonic, password);
  const encryptedData = cipher.toString();
  return encryptedData;
};

export default LoginContext;
