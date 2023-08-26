import React, { ReactNode, useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import useLocalStorage from "use-local-storage";

// Define the LoginContextType
interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: (enteredPassword: string) => boolean;
  logout: () => boolean;
  isPasswordPresent: () => boolean; // Add this function
  signup: (mnemonics: string, password: string) => boolean;
  isSignup: boolean;
  signOut:()=> boolean;
}

const LoginContext = React.createContext<LoginContextType | null>(null);

interface Props {
  children: ReactNode;
}


export const LoginContextProvider = ({ children }: Props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isSignup, setSignup] = useState(false);
  const [localPassword, setLocalPassword] = useState<string | null>(null);

  useEffect(() => {
    const validate= async()=>{
      const pass = await localStorage.getItem("password");
      console.log('useFee')
    if (pass !== null && pass !== "") {
      setLocalPassword(pass);
      setSignup(true);
    } else {
      setLocalPassword(null);
      setSignup(false);
    }
    }
    validate()
  }, []);

  const isPasswordPresent = () => {
    return localStorage.getItem("password") !== null;
  };

  const login = (enteredPassword: string): boolean => {
    console.log("local password", localPassword);
    console.log("enteredPassword", enteredPassword);
    if (localPassword === enteredPassword) {
      setIsLoggedIn(true);
      return true;
    }
    setIsLoggedIn(false);
    return false;
  };



  const signup = (mnemonics: string, password: string): boolean => {
    console.log("setting password", password);
    localStorage.setItem("password", password);
    
    const encryptedMnemonic = encryptMnemonic(mnemonics, password);
    localStorage.setItem("mnemonic", encryptedMnemonic.toString());
    const isLogin = login(password);
    if (isLogin) {
      return true;
    }
    return false;
  };

  const signOut = ():boolean => {
    const removePassword = localStorage.removeItem("password");
    const removeMnemonic = localStorage.removeItem("mnemonic");
    setSignup(false);
    setIsLoggedIn(false);
    return true;
  };

  // Function to simulate a logout
  const logout = ():boolean => {
    setIsLoggedIn(false);
    return true
  };

  // Define the value object to be provided to consumers
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    isPasswordPresent,
    signup,
    isSignup,
    signOut,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

// Custom hook to access the LoginContext
export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);

  if (context === null) {
    throw new Error("useLogin must be used within a LoginContextProvider");
  }

  return context;
};

// Functions to decrypt the mnemonic and compare the password
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

function storePassword(password: string) {
  localStorage.setItem("password", password);
}

function storeMnemonics(hashedMnemonics: string) {
  localStorage.setItem("mnemonic", hashedMnemonics);
}

export default LoginContext;
