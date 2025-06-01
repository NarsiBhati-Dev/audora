import type { Request, Response } from "express";
import {
  createProject as createProjectService,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
} from "@audora/database/projectServices";

export const createProject = async (req: Request, res: Response) => {
  const { studioId, projectName } = req.body;

  const project = await createProjectService(studioId, projectName);

  res.status(201).json(project);
  return;
};

export const updateProject = async (req: Request, res: Response) => {
  const { projectId, projectName } = req.body;

  const project = await updateProjectService(projectId, projectName);

  res.status(200).json(project);
  return;
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const project = await deleteProjectService(projectId as string);

  res.status(200).json(project);
  return;
};
