import { type Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";

export const setProfileName = async (req: AuthRequest, res: Response) => {
  const id = req.auth?.id;

  if (!id) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "User not found" });
    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "Name is required" });
    return;
  }

  res.status(HttpStatus.OK).json({ message: "Profile name set successfully" });
  return;
};
