import { client } from "../client";

// project services

export const createProjectService = async ({
  title,
  studioId,
}: {
  title: string;
  studioId: string;
}) => {
  const project = await client.project.create({
    data: {
      title,
      studio: {
        connect: { id: studioId },
      },
    },
  });

  return project;
};
