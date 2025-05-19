import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

interface TokenPayload {
  id: string;
}

/**
 * Generate a JWT token for user authentication.
 * @param id - The user ID to encode in the token.
 * @returns The generated JWT token.
 */
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET as string, { expiresIn: "1d" });
};

/**
 * Decode a JWT token without verifying.
 * @param token - The JWT token to decode.
 * @returns The decoded payload or null if invalid.
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    // console.error("JWT Decoding Error:", error);
    return null;
  }
};
