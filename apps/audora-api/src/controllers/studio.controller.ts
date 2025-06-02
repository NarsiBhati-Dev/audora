import type { Request, Response } from "express";
import {
  createStudioService,
  updateStudioService,
  deleteStudioService,
  getStudioByUserIdService,
} from "@audora/database/studioServices";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";

export const createStudio = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id as string;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { studioName } = req.body;
  if (!studioName) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio name is required",
    });
    return;
  }

  try {
    const existingStudio = await getStudioByUserIdService(userId);

    if (existingStudio) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          "Studio already exists, please delete it first to create a new one",
      });
      return;
    }

    const studio = await createStudioService({
      studioName,
      userId,
      recordingType: "VIDEO_AUDIO",
      audioSampleRate: "KHZ_44_1",
      videoQuality: "STANDARD",
      noiseReduction: false,
      language: "English",
      countdownBeforeRecording: false,
      autoStartOnGuestJoin: false,
      pauseUploads: false,
      enableLobby: false,
      enableCaptions: false,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Studio created successfully",
      studio,
    });

    return;
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create studio",
    });
    return;
  }
};

export const updateStudio = async (req: AuthRequest, res: Response) => {
  const { studioId, studioName } = req.body;

  if (!studioId || !studioName) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID and studio name are required",
    });
    return;
  }

  const studio = await updateStudioService(studioId, {
    studioName,
  });

  res.status(HttpStatus.OK).json({
    success: true,
    message: "Studio updated successfully",
    studio,
  });
  return;
};

export const deleteStudio = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const studio = await getStudioByUserIdService(userId);

  if (!studio) {
    res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      message: "Studio not found",
    });
    return;
  }

  const deletedStudio = await deleteStudioService(studio.id);

  if (!deletedStudio) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete studio",
    });
    return;
  }

  res.status(HttpStatus.OK).json({
    success: true,
    message: "Studio deleted successfully",
  });
  return;
};

export const getStudio = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  try {
    const studio = await getStudioByUserIdService(userId as string);

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
    return;
  } catch {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch studio",
    });
    return;
  }
};

export const updateStudioSetting = async (req: AuthRequest, res: Response) => {
  const { studioId, settingName, settingValue } = req.body;

  const userId = req.auth?.id;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  if (!studioId || !settingName || !settingValue) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID, setting name, and setting value are required",
    });
    return;
  }

  try {
    const studio = await getStudioByUserIdService(userId as string);

    if (!studio) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Studio not found",
      });
      return;
    }

    if (studio.id !== studioId) {
      res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "You are not authorized to update this studio setting",
      });
      return;
    }

    const updatedStudio = await updateStudioService(studioId, {
      [settingName]: settingValue,
    });
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Studio setting updated successfully",
      studio: updatedStudio,
    });
    return;
  } catch {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update studio setting",
    });
    return;
  }
};
