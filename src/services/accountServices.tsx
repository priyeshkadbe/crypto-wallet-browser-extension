"use client"
import ethers from "ethers"
import bcrypt  from "bcryptjs";
import CryptoJS from "crypto-js";
import bip39 from "bip39"

// export const validateMnemonic = async (mnemonic: string) => {
//   try {
//     await bip39.validateMnemonic(mnemonic);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };



export const checkAccountExists = async (inputValues:string) => {
  try {
    console.log("input values")
    const isWalletExists = await ethers.utils.isValidMnemonic(inputValues.toString());
    console.log("input values" ,isWalletExists);

    return isWalletExists;
  } catch (error) {
    console.error("Error validating mnemonic:", error);
    return false;
  }
};


export const createWallet = async(mnemonic:string) => {
  try {
    const wallet = await ethers.Wallet.fromMnemonic(mnemonic.toString());
    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
    };
  } catch (error) {
    return error;
  }
}





export const encryptMnemonic = async (mnemonic:string,password:string) => {

   const cipher = CryptoJS.AES.encrypt(
     mnemonic,
    password
   );

  const encryptedData = cipher.toString();
  return encryptedData;
}



export const decryptMnemonic = async (encryptedMnemonic: string, password:string) => {
  const cipher = CryptoJS.AES.decrypt(
    encryptedMnemonic,
    password
  );
  const decryptedData = cipher.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}


export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const comparePassword = (enteredPassword: string, encryptedPassword: string) => {
  const salt = encryptedPassword?.slice(0, 24);
  const hashedPasswordAttempt = bcrypt.hashSync(enteredPassword, salt);
  return bcrypt.compareSync(hashedPasswordAttempt, encryptedPassword);
};


export const storePassword=(password: string) => {
  localStorage.setItem("password", password);
}

export const storeMnemonics = (hashedMnemonics: string) => {
  localStorage.setItem("mnemonic", hashedMnemonics);
}





