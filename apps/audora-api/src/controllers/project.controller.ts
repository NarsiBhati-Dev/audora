import type { Request, Response } from "express";
import {
  createProject as createProjectService,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
} from "@audora/database/projectServices";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";

export const createProject = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id as string;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { studioId, projectName } = req.body;

  if (!studioId || !projectName) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID and project name are required",
    });
    return;
  }

  if (!studioId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID is required",
    });
    return;
  }

  try {
    const project = await createProjectService(studioId, projectName);

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Project created successfully",
      project,
    });
    return;
  } catch {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create project",
    });
    return;
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id as string;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { projectId, projectName } = req.body;

  if (!projectId || !projectName) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Project ID and project name are required",
    });
    return;
  }

  try {
    const project = await updateProjectService(projectId, projectName);

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
    return;
  } catch {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update project",
    });
    return;
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id as string;

  if (!userId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const { projectId } = req.params;

  if (!projectId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Project ID is required",
    });
    return;
  }
  try {
    const project = await deleteProjectService(projectId as string);

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Project deleted successfully",
      project,
    });
    return;
  } catch {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete project",
    });
    return;
  }
};
