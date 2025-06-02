import type { Request, Response } from "express";
import {
  createStudio as createStudioService,
  updateStudio as updateStudioService,
  deleteStudio as deleteStudioService,
  getStudioByUserId as getStudioService,
} from "@audora/database/studioServices";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";

export const createStudio = async (req: Request, res: Response) => {
  const { studioName } = req.body;

  const studio = await createStudioService(studioName);

  res.status(HttpStatus.CREATED).json(studio);
  return;
};

export const updateStudio = async (req: Request, res: Response) => {
  const { studioId, studioName } = req.body;

  const studio = await updateStudioService(studioId, studioName);

  res.status(HttpStatus.OK).json(studio);
  return;
};

export const deleteStudio = async (req: Request, res: Response) => {
  const { id } = req.params;

  const studio = await deleteStudioService(id as string);

  res.status(HttpStatus.OK).json(studio);
  return;
};

export const getStudio = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "User ID is required",
    });
    return;
  }

  try {
    const studio = await getStudioService(userId as string);

    if (!studio) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Studio not found",
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Studio fetched successfully",
      studio,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch studio",
    });
  }
  return;
};

export const updateStudioSetting = async (req: Request, res: Response) => {
  const { studioId, settingName, settingValue } = req.body;

  const studio = await updateStudioService(studioId, {
    [settingName]: settingValue,
  });

  res.status(HttpStatus.OK).json(studio);
  return;
};
