import type { Track } from "@prisma/client";
import { client } from "../client";

// track services

export const createTrackService = async ({
  title,
  projectId,
}: {
  title: string;
  projectId: string;
}) => {
  const track = await client.track.create({
    data: {
      name: title,
      project: {
        connect: { id: projectId },
      },
    },
  });

  return track;
};

export const deleteTrackService = async (trackId: string) => {
  const track = await client.track.delete({
    where: { id: trackId },
  });

  return track;
};

export const getTrackByIdService = async (trackId: string) => {
  const track = await client.track.findUnique({
    where: { id: trackId },
  });

  return track;
};

export const getTracksByProjectIdService = async (projectId: string) => {
  const tracks = await client.track.findMany({
    where: { projectId },
  });

  return tracks;
};

export const updateTrackService = async (
  trackId: string,
  data: Partial<Track>,
) => {
  const track = await client.track.update({
    where: { id: trackId },
    data,
  });

  return track;
};
