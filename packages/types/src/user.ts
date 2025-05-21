import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .max(16, "Password must be less than 16 characters");

export const nameSchema = z
  .string()
  .trim()
  .nonempty({ message: "Name is required" })
  .min(2, "Name must be at least 2 characters")
  .max(16, "Name must be less than 16 characters");

export const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address" })
  .nonempty({ message: "Email is required" });

// Schema for user signup
export const UserRegisterSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Schema for user login
export const UserLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Export types
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserSignup = z.infer<typeof UserRegisterSchema>;
