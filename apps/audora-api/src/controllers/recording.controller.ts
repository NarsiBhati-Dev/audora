import type { Request, Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
// import fs from "fs";

export const recordingController = (req: Request, res: Response) => {
  const chunk = req.file;

  if (!chunk) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "No chunk file provided",
    });
    return;
  }

  res.status(HttpStatus.OK).json({
    success: true,
    message: "Chunk uploaded successfully",
  });
  return;
};
