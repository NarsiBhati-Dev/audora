import type { Request, Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
import { generateMeetingToken } from "../utils/jwt";
import { getStudioByStudioSlugService } from "@audora/database/studioServices";

export const generateMeetingTokenController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { studioSlug, userId, studioToken } = req.body;

    if (!studioSlug) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Missing required field: studioSlug",
      });
      return;
    }

    const studio = await getStudioByStudioSlugService(studioSlug);

    if (!studio) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Studio not found",
      });
      return;
    }

    const isHost = studio.userId === userId;
    const finalUserId = userId || crypto.randomUUID();
    const participantRole = isHost ? "host" : "guest";

    // If not host, validate studioToken for guest access
    if (!isHost && studio.token !== studioToken) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid studio token for guest",
      });
      return;
    }

    const token = generateMeetingToken({
      studioId: studio.id,
      studioSlug: studio.studioSlug,
      userId: finalUserId,
      participantId: crypto.randomUUID(),
      participantRole,
      recordable: isHost,
      roomId: `${studio.studioSlug}-${Date.now()}`,
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Meeting token generated successfully",
      data: {
        token,
        userId: finalUserId,
        participantRole,
        studioFixedToken: studio.token,
      },
    });
    return;
  } catch (error) {
    console.error("Error generating meeting token:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to generate meeting token",
    });
    return;
  }
};
