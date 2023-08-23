import { Mnemonic } from "ethers";
import {  ethers } from "ethers";

export const checkAccountExists = async (mnemonic: any):Promise<Boolean> => {
  try {
    const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic)
    return true;
  } catch (error) {
    throw error
  }
}

