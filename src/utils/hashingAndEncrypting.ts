import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

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
  return CryptoJS.AES.decrypt(encryptedMnemonic, password).toString(
    CryptoJS.enc.Utf8
  );
};

const encryptMnemonic = async (mnemonic: string, password: string) => {
  return CryptoJS.AES.encrypt(mnemonic, password).toString();
};

export  {
  comparePassword,
  hashedPassword,
  decryptMnemonic,
  encryptMnemonic
}
