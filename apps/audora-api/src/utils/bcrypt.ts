import bcrypt from "bcrypt";

/**
 * Hash a password using bcrypt with a salt round of 10.
 * @param password - The plain text password to hash.
 * @returns The hashed password as a string.
 */
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

/**
 * Verify if a given password matches a hashed password.
 * @param password - The plain text password to check.
 * @param hashedPassword - The stored hashed password.
 * @returns A boolean indicating whether the passwords match.
 */
export const verifyPassword = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
