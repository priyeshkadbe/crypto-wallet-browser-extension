import dotenv from "dotenv";
dotenv.config();
import  { Secret } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";


const createToken = (data: { password: string; mnemonic: string }): string => {
  try {
    // Retrieve the JWT secret key from a secure source (e.g., environment variable)
    const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY as Secret;

    // Check if the JWT key is available
    if (!JWT_KEY) {
      throw new Error("JWT secret key is missing.");
    }

    // Create the JWT token with the payload and expiration time
    const token = jwt.sign(data, JWT_KEY);

    return token;
  } catch (error) {
    // Log and handle errors
    console.error("Error creating JWT token:", error);
    throw error;
  }
};


const verifyToken = (token: string):boolean => {
  try {
    const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY as Secret;
    const response = jwt.verify(token, JWT_KEY);
    if (response) {
      return true
    }
    return false
  } catch (error) {
    console.log("something went wrong in token validation");
    return false;
  }
};

export {
  createToken,
  verifyToken
}