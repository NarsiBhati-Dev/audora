import { type Response } from "express";
import {
  createProjectService,
  deleteProjectService,
  getProjectsByStudioId,
  getProjectService,
  updateProjectService,
} from "@audora/database/projectServices";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";

export const createProject = async (req: AuthRequest, res: Response) => {
  const { title, studioId } = req.body;

  if (!title || !studioId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Title and studioId are required",
    });
    return;
  }
  try {
    const project = await createProjectService({ title, studioId });
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create project",
    });
    return;
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;

  if (!projectId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Project ID is required",
    });
    return;
  }
  try {
    const project = await deleteProjectService(projectId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete project",
    });
    return;
  }
};

export const getProject = async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;

  if (!projectId) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Project ID is required",
    });
    return;
  }
  try {
    const project = await getProjectService(projectId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to get project",
    });
    return;
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  const { studioId, page } = req.body;

  if (!studioId || !page) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Studio ID is required",
    });
    return;
  }
  try {
    const projects = await getProjectsByStudioId(studioId, page);
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to get projects",
    });
    return;
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;
  const { title } = req.body;

  if (!projectId || !title || !req.auth?.id) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Project ID and title are required",
    });
    return;
  }
  try {
    const project = await updateProjectService(projectId, title);
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update project",
    });
    return;
  }
};
