import dotenv from "dotenv";
dotenv.config();
import jwt, { Secret } from "jsonwebtoken";



const createToken = (password: string) => {
  try {
    const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY as Secret;

    const result = jwt.sign(password, JWT_KEY, {
      expiresIn: "1h",
    });
    return result;
  } catch (error) {
    console.log("something went wrong in the token creation");
    throw { error };
  }
};

const verifyToken = (token: string) => {
  try {
    const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY as Secret;
    const response = jwt.verify(token, JWT_KEY);
    return response;
  } catch (error) {
    console.log("something went wrong in token validation");
    throw { error };
  }
};

export {
  createToken,
  verifyToken
}