import type { Project } from "@prisma/client";
import { client } from "../index";

export const createProject = async (studioId: string, projectName: string) => {
  const project = await client.project.create({
    data: {
      name: projectName,
      studio: {
        connect: {
          id: studioId,
        },
      },
    },
  });

  return project;
};

export const updateProject = async (
  projectId: string,
  data: Partial<Project>
) => {
  const project = await client.project.update({
    where: { id: projectId },
    data,
  });

  return project;
};

export const getProjectById = async (projectId: string) => {
  const project = await client.project.findUnique({
    where: { id: projectId },
  });

  return project;
};

export const getProjectsByStudioId = async (studioId: string) => {
  const projects = await client.project.findMany({
    where: { studioId },
  });

  return projects;
};

export const deleteProject = async (projectId: string) => {
  const deletedProject = await client.project.delete({
    where: { id: projectId },
  });

  return deletedProject;
};
