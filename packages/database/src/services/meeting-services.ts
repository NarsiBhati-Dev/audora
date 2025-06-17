import { client } from "..";
import { generateTokenExpiresAt } from "../utils/generateMeetingToken";

export const createMeetingService = async (
  studioId: string,
  hostId: string
) => {
  const { tokenExpiresAt } = generateTokenExpiresAt();

  try {
    const meeting = await client.meeting.create({
      data: {
        studioId,
        hostId,
        tokenExpiresAt,
      },
    });

    return meeting;
  } catch (error) {
    console.error("Error creating meeting:", error);
    return null;
  }
};

export const verifyMeetingTokenService = async (
  studioId: string,
  token: string
) => {
  try {
    const meeting = await client.meeting.findFirst({
      where: { studioToken: token, studioId },
    });

    if (
      !meeting ||
      (meeting.tokenExpiresAt && meeting.tokenExpiresAt <= new Date())
    ) {
      return null;
    }

    return meeting;
  } catch (error) {
    console.error("Error verifying meeting token:");
    return null;
  }
};

export const getMeetingByTokenService = async (
  studioId: string,
  token: string
) => {
  try {
    const meeting = await client.meeting.findFirst({
      where: { studioToken: token, studioId },
    });

    return meeting;
  } catch (error) {
    console.error("Error getting meeting by token:", error);
    return null;
  }
};
