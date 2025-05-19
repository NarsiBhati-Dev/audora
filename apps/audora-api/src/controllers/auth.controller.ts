import { type Request, type Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import type { AuthRequest } from "../utils/request-type";
import { createUser, getUserByEmail } from "@audora/database/userServices";

// export const signup = async (req: Request, res: Response) => {
//   try {
//     // Validate request
//     // const parsedData = CreateUserSchema.safeParse(req.body);
//     if (!parsedData.success) {
//       res.status(HttpStatus.BAD_REQUEST).json({
//         success: false,
//         error: parsedData.error.errors,
//       });
//       return;
//     }

//     const { email, password, name } = parsedData.data;

//     // check if user exist already or not
//     const userExist = await getUserByEmail(email);
//     if (userExist) {
//       res
//         .status(HttpStatus.BAD_REQUEST)
//         .json({ success: false, error: "Username already taken" });
//       return;
//     }

//     // hash password
//     const hashedPassword = await hashPassword(password);

//     // create user
//     const newUser = await createUser(email, hashedPassword, name);
//     res.status(HttpStatus.CREATED).json({
//       success: true,
//       message: "User created successfully",
//       user: newUser,
//     });
//     return;
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res
//       .status(HttpStatus.INTERNAL_SERVER_ERROR)
//       .json({ success: false, error: "Internal server error" });
//     return;
//   }
// };

// export const signin = async (req: Request, res: Response) => {
//   try {
//     // Validate input
//     const parsedData = SigninSchema.safeParse(req.body);
//     if (!parsedData.success) {
//       res.status(HttpStatus.BAD_REQUEST).json({
//         success: false,
//         error: parsedData.error.errors,
//       });
//       return;
//     }

//     const { email, password } = parsedData.data;

//     // Fetch user from database
//     const user = await getUserByEmail(email);
//     if (!user) {
//       res.status(HttpStatus.UNAUTHORIZED).json({
//         success: false,
//         error: "Invalid email or password",
//       });
//       return;
//     }

//     // Compare passwords
//     const isPasswordValid = await verifyPassword(password, user.password);

//     if (!isPasswordValid) {
//       res.status(HttpStatus.UNAUTHORIZED).json({
//         success: false,
//         error: "Invalid email or password",
//       });
//       return;
//     }

//     // Generate JWT token
//     const token = generateToken(user.id);

//     // Send response
//     res.status(HttpStatus.OK).json({
//       success: true,
//       message: "Signin successful",
//       token,
//     });
//     return;
//   } catch (error) {
//     console.error("Signin error:", error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       error: "Internal server error",
//     });
//     return;
//   }
// };

// export const me = async (req: AuthRequest, res: Response) => {
//   try {
//     if (!req.auth?.id) {
//       res.status(HttpStatus.UNAUTHORIZED).json({
//         success: false,
//         error: "Unauthorized: No user ID found",
//       });
//       return;
//     }

//     const user = await getUserById(req.auth.id);

//     if (!user) {
//       res.status(HttpStatus.NOT_FOUND).json({
//         success: false,
//         error: "User not found",
//       });
//       return;
//     }

//     res.status(HttpStatus.OK).json({
//       success: true,
//       message: `Welcome ${user.name}`,
//       name: user.name,
//     });
//     return;
//   } catch (error) {
//     console.error("Me Route Error:", error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       error: "Internal server error",
//     });
//     return;
//   }
// };
