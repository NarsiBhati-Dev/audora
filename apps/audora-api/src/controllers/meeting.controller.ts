import {
  createMeetingService,
  getMeetingByTokenService,
  verifyMeetingTokenService,
} from "@audora/database/meetingServices";

import type { Request, Response } from "express";
import type { AuthRequest } from "../utils/request-type";
import { HttpStatus } from "../utils/HttpStatus";

export const createMeeting = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id;

  if (!userId) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { studioId, hostId } = req.body;

  if (!studioId || !hostId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID and host ID are required",
    });
    return;
  }

  try {
    const meeting = await createMeetingService(studioId, hostId);

    if (!meeting) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Meeting not created",
      });
      return;
    }

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Meeting created successfully",
      meeting,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export const getMeeting = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id;

  if (!userId) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { studioId, token } = req.body;

  if (!studioId || !token) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID and token are required",
    });
    return;
  }

  try {
    const meeting = await getMeetingByTokenService(studioId, token);

    if (!meeting) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Meeting not found",
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Meeting found",
      meeting,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export const verifyMeeting = async (req: Request, res: Response) => {
  const { studioId, token } = req.body;

  if (!studioId || !token) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID and token are required",
    });
    return;
  }

  try {
    const meeting = await verifyMeetingTokenService(studioId, token);

    if (!meeting) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Meeting not found",
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Meeting verified",
      meeting,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
