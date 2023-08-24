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
    const { address, publicKey, privateKey } = await ethers.Wallet.fromMnemonic(mnemonic);
    return true
    // return { address, publicKey, privateKey };
  } catch (error) {
    return error;
  }
}

export const encryptMnemonic = async (mnemonic:string,password:string) => {

   const cipher = CryptoJS.AES.encrypt(
     mnemonic,
     CryptoJS.enc.Utf8.parse(password),
     {
       mode: CryptoJS.mode.CBC,
       padding: CryptoJS.pad.Pkcs7,
     }
   );

  const encryptedData = cipher.toString();

  return encryptedData;
}



export const decryptMnemonic = async (encryptedMnemonic: string, password:string) => {
  const cipher = CryptoJS.AES.decrypt(
    encryptedMnemonic,
    CryptoJS.enc.Utf8.parse(password),
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  const decryptedData = cipher.toString(CryptoJS.enc.Utf8);

  return decryptedData;
}


export const encryptPassword = (password: string) => {
  // Generate a random salt
  const salt = bcrypt.genSaltSync(10);

  // Hash the password with the salt
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Return the encrypted password
  return hashedPassword;
};

export const comparePassword = (enteredPassword: string, encryptedPassword: string) => {

  const salt = encryptedPassword?.slice(0, 24);

  const hashedPasswordAttempt = bcrypt.hashSync(enteredPassword, salt);

  // Compare the hashed passwords
  return bcrypt.compareSync(hashedPasswordAttempt, encryptedPassword);
};


export const storePassword=(password: string) => {
  localStorage.setItem("password", password);
}

export const storeMnemonics = (hashedMnemonics: string) => {
  localStorage.setItem("mnemonic", hashedMnemonics);
}





