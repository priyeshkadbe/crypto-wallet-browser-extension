"use client"
import ethers from "ethers"
import bcrypt  from "bcryptjs";
import CryptoJS from "crypto-js";

export const validateMnemonic = async (mnemonic: string) => {
  try {
    await ethers.utils.isValidMnemonic(mnemonic);
    return true;
  } catch (error) {
    return false;
  }
};



export const checkAccountExists = async (inputValues:string) => {
  let isWalletExits = validateMnemonic(inputValues);
  if (!isWalletExits) {
    return false;
  }
  return true;
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

  // Encrypt the data
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

  // Decrypt the data
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





