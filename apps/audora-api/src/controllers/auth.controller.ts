import { type Request, type Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
import { hashPassword, verifyPassword } from "../utils/bcrypt";

import { createUser, getUserByEmail } from "@audora/database/userServices";
import { UserLoginSchema, UserRegisterSchema } from "@audora/types";
import { generateToken } from "../utils/jwt";
import {
  createStudioService,
  getStudioByUserIdService,
} from "@audora/database/studioServices";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    const parsedData = UserRegisterSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: parsedData.error.errors,
      });
      return;
    }

    const userExist = await getUserByEmail(email);
    if (userExist) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: "Username already taken",
      });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const studioName = `${newUser.name.toLowerCase().replace(/\s+/g, "-")}'s-studio`;

    // Create a default studio for the user
    const studio = await createStudioService({
      userId: newUser.id,
      studioName,
      recordingType: "VIDEO_AUDIO",
      audioSampleRate: "KHZ_44_1",
      videoQuality: "STANDARD",
      countdownBeforeRecording: false,
      enableLobby: false,
      language: "English",
      noiseReduction: false,
      enableCaptions: false,
      autoStartOnGuestJoin: false,
      pauseUploads: false,
    });

    if (!studio) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Failed to create studio",
      });
      return;
    }

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      studio,
    });

    return;
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Internal server error",
    });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const parsedData = UserLoginSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: parsedData.error.errors,
      });
      return;
    }

    const user = await getUserByEmail(email);
    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    if (!user.password) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const accessToken = generateToken(user.id);
    const studio = await getStudioByUserIdService(user.id);

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Login successful",
      user,
      studioId: studio?.id,
      accessToken,
    });
    return;
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Internal server error",
    });
    return;
  }
};

export const registerWithGoogle = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const userExist = await getUserByEmail(email);

    if (userExist) {
      if (userExist.provider !== "google") {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          error:
            "Email already registered with password. Please login using email and password.",
        });
        return;
      }

      const accessToken = generateToken(userExist.id);

      res.status(HttpStatus.OK).json({
        success: true,
        error: "User already exists",
        user: userExist,
        accessToken,
      });
      return;
    }

    const newUser = await createUser({
      name: name || "Google User",
      email,
      provider: "google",
    });

    const studioName = `${newUser.name.toLowerCase().replace(/\s+/g, "-")}'s-studio`;

    const studio = await createStudioService({
      userId: newUser.id,
      studioName,
      recordingType: "VIDEO_AUDIO",
      noiseReduction: false,
      audioSampleRate: "KHZ_44_1",
      videoQuality: "STANDARD",
      countdownBeforeRecording: false,
      enableLobby: false,
      enableCaptions: false,
      autoStartOnGuestJoin: false,
      pauseUploads: false,
      language: "English",
    });

    const accessToken = generateToken(newUser.id);

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      studioId: studio?.id,
      accessToken,
    });
    return;
  } catch {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Internal server error",
    });
    return;
  }
};
