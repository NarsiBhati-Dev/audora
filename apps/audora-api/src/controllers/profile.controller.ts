import { type Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";
import { getUserById, updateUserById } from "@audora/database/userServices";

export const setProfileName = async (req: AuthRequest, res: Response) => {
  const id = req.auth?.id;

  if (!id) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message: "User not found" });
    return;
  }

  const { name } = req.body;
  const user = await getUserById(id);

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

  await updateUserById(id, name);

  res.status(HttpStatus.OK).json({
    success: true,
    message: "Profile name updated successfully",
    user: {
      name,
    },
  });
  return;
};
