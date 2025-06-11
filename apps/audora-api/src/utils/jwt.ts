import jwt from "jsonwebtoken";
import { NEXTAUTH_SECRET } from "../config/env";

interface TokenPayload {
  id: string;
}

/**
 * Generate a JWT token for user authentication.
 * @param id - The user ID to encode in the token.
 * @returns The generated JWT token.
 */

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, NEXTAUTH_SECRET as string, { expiresIn: "1d" });
};

/**
 * Verify a JWT token and return the decoded payload.
 * @param token - The JWT token to verify.
 * @returns The decoded payload or null if verification fails.
 */

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, NEXTAUTH_SECRET as string) as TokenPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};
