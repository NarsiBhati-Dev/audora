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

export const updateProjectService = async (
  projectId: string,
  title: string
) => {
  const project = await client.project.update({
    where: { id: projectId },
    data: { title },
  });

  return project;
};

export const deleteProjectService = async (projectId: string) => {
  const project = await client.project.delete({
    where: { id: projectId },
  });

  return project;
};

export const getProjectService = async (projectId: string) => {
  const project = await client.project.findUnique({
    where: { id: projectId },
  });

  return project;
};

export const getProjectsByStudioId = async (
  studioId: string,
  page: number = 1
) => {
  const limit: number = 10;
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    client.project.findMany({
      where: { studioId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    client.project.count({
      where: { studioId },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    projects,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      perPage: limit,
    },
  };
};
