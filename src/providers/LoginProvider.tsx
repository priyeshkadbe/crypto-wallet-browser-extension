import React, { ReactNode, useContext, useState } from "react";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

// Define the LoginContextType
interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: (enteredPassword: string) => boolean;
  logout: () => void;
  isPasswordPresent: () => boolean; // Add this function
  signup: (mnemonics: string, password: string) => boolean;
}

// Create the LoginContext with an initial value of null
const LoginContext = React.createContext<LoginContextType | null>(null);

// Props for the LoginContextProvider
interface Props {
  children: ReactNode;
}

// The LoginContextProvider component
export const LoginContextProvider = ({ children }: Props) => {
  // State to track whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  // Function to check if password is present
  const isPasswordPresent = () => {
    return localStorage.getItem("password") !== null;
  };

  // Function to simulate a login
  const login = (enteredPassword: string):boolean => {
    // const hashedPassword = localStorage.getItem("password");
    // if (
    //   hashedPassword !== null &&
    //   comparePassword(enteredPassword, hashedPassword)
    // ) {
    //   // The password is correct, so the user is logged in.
    //   setIsLoggedIn(true);
    // } else {
    //   // The password is incorrect, so the user is not logged in.
    //   setIsLoggedIn(false);
    // }

    try {
      const hashedPassword = localStorage.getItem("password");
      if (
        hashedPassword !== null &&
        comparePassword(enteredPassword, hashedPassword)
      ) {
        // The password is correct, so the user is logged in.
        setIsLoggedIn(true);
        return true
      }
      setIsLoggedIn(false)
      return false;
    } catch (error) {
      setIsLoggedIn(false);
      return false
    }
  };

  const signup = (mnemonics: string, password: string):boolean => {
    try {
      const encryptedPassword = hashedPassword(password);
      localStorage.setItem("password", encryptedPassword);
      const encryptedMnemonic = encryptMnemonic(mnemonics, password);
      localStorage.setItem("mnemonic", encryptedMnemonic.toString());
      const isLogin = login(password)
      if (isLoggedIn) {
        return true
      }
      return false
    } catch (error) {
      return false
    }

    
    //login(password);
  };

  // Function to simulate a logout
  const logout = () => {
    setIsLoggedIn(false);
  };

  // Define the value object to be provided to consumers
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    isPasswordPresent,
    signup,
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
