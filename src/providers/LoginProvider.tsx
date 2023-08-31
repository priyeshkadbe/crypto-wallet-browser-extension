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
import { createToken, verifyToken } from "@/utils/jwt";

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
  addAccount: (val: string) => Promise<boolean>;
  switchAccount: (val: string) => Promise<boolean>;
}

const LoginContext = React.createContext<LoginContextType | null>(null);

interface Props {
  children: ReactNode;
}

interface WalletFields {
  address: string;
  privateKey: string;
}

type Wallet = Array<Record<string, WalletFields>>;

export const LoginContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const [localPassword, setLocalPassword] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number>(11155111);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [mnemonic, setLocalMnemonics] = useState<string | null>(null);
  const [planMnemonic, setPlainMnemonic] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      isAuthenticated(token).then((valid) => {
        if (valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  });

  useEffect(() => {
    const pass = Cookies.get("password");
    console.log("localPass", pass);
    const mne = Cookies.get("mnemonic");
    console.log("mne", mne);
    if (pass !== undefined && mne !== undefined) {
      setLocalMnemonics(mne);
      setLocalPassword(pass);
      //setSignup(true);
    }
  }, [isLoggedIn,localPassword, chainId, network, wallet, balance]);

  const isPasswordPresent = () => {
    return Cookies.get("password") !== undefined; // Use Cookies.get instead of localStorage.getItem
  };

  useEffect(() => {
    changeNetwork(chainId!);
  }, [chainId]);

  const changeNetwork = (chainId: number) => {
    setChainId(chainId);
    if (wallet !== null) {
      const provider = new ethers.JsonRpcProvider(getProvider(chainId));
      console.log("provider is ", getProvider(chainId));
      provider.getNetwork().then((val) => {
        setNetwork(val.name);
        console.log("logoUrl:", val);
        //console.log("provider.getSigner", provider.getSigner());
      });
      // provider.getBalance(address).then((val) => {
      //   setBalance(ethers.utils.formatEther(val).toString());
      // });
      //provider.getBalance()
    }
  };

  const createWallet = async (mnemonic: string): Promise<boolean> => {
    try {
      const provider = new ethers.JsonRpcProvider(getProvider(chainId));
      console.log("provider is ", provider);
      provider.getBlockNumber().then((val) => {
        console.log("block", val);
      });
      // const wallet = ethers.Wallet.fromMnemonic(mnemonic.toString());
      const wallet = await ethers.HDNodeWallet.fromPhrase(mnemonic);
      console.log("wallet", wallet);
      if (await wallet.address) {
        const data = {
          address: wallet.address,
          //publicKey: wallet.publicKey,
          privateKey: wallet.privateKey,
          // mnemonic: JSON.stringify(wallet.mnemonic?.phrase),
        };

        setWallet((prevWallet) => [
          ...(prevWallet || []),
          {
            [`Account${(prevWallet?.length || 0) + 1}`]: {
              address: data.address,
              privateKey: data.privateKey,
            },
          },
        ]);

        setAccount(wallet.address);
        // setWallet(data);
        console.log("data is ", data);

        provider.getNetwork().then((val) => {
          console.log(val);
          setNetwork(val.toString());
        });

        provider.getBalance(wallet.address).then((val) => {
          console.log(ethers.formatEther(val));
          setBalance(ethers.formatEther(val));
        });
        setIsLoggedIn(true);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  //   const createWallet = async (mnemonic: string): Promise<boolean> => {
  //   try {
  //     const provider = new ethers.JsonRpcProvider(getProvider(chainId));
  //     console.log("provider is ", provider);
  //     provider.getBlockNumber().then((val) => {
  //       console.log("block", val);
  //     });

  //     // Create an array to hold the accounts
  //     const newAccounts = [];

  //     for (let i = 0; i < 10; i++) {
  //       // Derive a unique account from the mnemonic for each iteration
  //       const hdnode = ethers.HDNodeWallet.fromPhrase(mnemonic);
  //       const account = hdnode.derivePath(`m/44'/60'/0'/0/${i}`);

  //       console.log("account", account);
  //       if (await account.address) {
  //         const data = {
  //           address: account.address,
  //           privateKey: account.privateKey,
  //         };

  //         // Push the account data to the array
  //         newAccounts.push({
  //           [`Account${i + 1}`]: {
  //             address: data.address,
  //             privateKey: data.privateKey,
  //           },
  //         });
  //       }
  //     }

  //     // Set the new accounts array as the wallet
  //     setWallet(newAccounts);

  //     // Set the first account as the active account (you can change this logic if needed)
  //     if (newAccounts.length > 0) {
  //       setAccount(newAccounts[0][`Account1`].address);
  //     }

  //     // provider.getNetwork().then((val) => {
  //     //   console.log(val);
  //     //   setNetwork(val.toString());
  //     // });

  //     // provider.getBalance(wallet.address).then((val) => {
  //     //   console.log(ethers.formatEther(val));
  //     //   setBalance(ethers.formatEther(val));
  //     // });

  //     setIsLoggedIn(true);
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  const login = async (enteredPassword: string): Promise<boolean> => {
    try {
      let isPasswordValid = false;
      if (localPassword !== null) {
        isPasswordValid = comparePassword(enteredPassword, localPassword);
      }

      if (mnemonic !== null && localPassword !== null && isPasswordValid) {
        // const newJwt = await createToken(enteredPassword);
        // Cookies.set("token", newJwt);
        const decryptedMnemonic = decryptMnemonic(mnemonic, enteredPassword);
        console.log("decryptMnemonic", decryptedMnemonic);
        setPlainMnemonic(decryptedMnemonic.toString());
        console.log("planMnemonic", planMnemonic);
        const isWalletCreated = await createWallet(planMnemonic!);
        if (isWalletCreated) {
          setIsLoggedIn(true);
          //setSignup(true);
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
      //const isLoggedIn=await login(password)
      console.log("isWalletCreated", isWalletCreated);

      if (isWalletCreated) {
        setPlainMnemonic(mnemonics);
        setIsLoggedIn(true);
        //setSignup(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const addAccount = async (accountName: string): Promise<boolean> => {
    try {
      const hdnode = ethers.HDNodeWallet.fromPhrase(planMnemonic!);
      const index = wallet?.length ?? 0;
      const account = hdnode.derivePath(`m/44'/60'/0'/0/${index + 1}`);
      const data: WalletFields = {
        address: account.address,
        privateKey: account.publicKey,
      };
      const updatedWallet = wallet ? [...wallet] : [];
      const newAccount = {
        [accountName]: data,
      };
      if (updatedWallet.length >= 10) {
        return false;
      }
      updatedWallet.push(newAccount);
      setWallet(updatedWallet);
      console.log("wallet is ", wallet);
      return true;
    } catch (error) {
      return false;
    }
  };

  const switchAccount = async (address: string): Promise<boolean> => {
    try {
      // Find the wallet with the specified address
      const selectedWallet = wallet?.find(
        (accountData) =>
          accountData[Object.keys(accountData)[0]].address === address
      );

      console.log("selectedWallet", selectedWallet);

      if (!selectedWallet) {
        // If the wallet with the provided address is not found, return false
        return false;
      }

      const selectedPrivateKey =
        selectedWallet[Object.keys(selectedWallet)[0]].privateKey;

      console.log("selectedPrivateKey", selectedPrivateKey);

      // Create a new ethers wallet using the selected private key
      const newWallet = new ethers.Wallet(selectedPrivateKey);

      console.log("newWallet", newWallet);

      // Set the new wallet as the active wallet
      setWallet([selectedWallet]);

      // Set the new account and perform any other necessary updates
      setAccount(newWallet.address);

      return true;
    } catch (error) {
      console.error("Error switching account:", error);
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

  const isAuthenticated = async (token: string): Promise<boolean> => {
    try {
      const response = await verifyToken(token);
      if (!response) {
        return false;
      }
      const user = Cookies.get("token");
      if (!user) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
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
    switchAccount,
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
