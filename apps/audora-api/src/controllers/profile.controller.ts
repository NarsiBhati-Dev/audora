import { type Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";
import { getUserById, updateUserById } from "@audora/database/userServices";

export const setProfileName = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { name } = req.body;

  try {
    const user = await getUserById(userId);

    if (!user) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "User not found" });
      return;
    }

    if (!name) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Name is required" });
      return;
    }

    const updatedUser = await updateUserById(userId, name);

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Profile name updated successfully",
      user: updatedUser,
    });
    return;
  } catch {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update profile name",
    });
    return;
  }
};
