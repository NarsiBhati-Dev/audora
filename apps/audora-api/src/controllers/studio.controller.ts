import type { Request, Response } from "express";
import {
  createStudio as createStudioService,
  updateStudio as updateStudioService,
  deleteStudio as deleteStudioService,
  getStudioById as getStudioByIdService,
} from "@audora/database/studioServices";
import { HttpStatus } from "../utils/HttpStatus";

export const createStudio = async (req: Request, res: Response) => {
  const { studioName } = req.body;

  const studio = await createStudioService(studioName);

  res.status(HttpStatus.CREATED).json(studio);
  return;
};

export const updateStudio = async (req: Request, res: Response) => {
  const { studioId, studioName } = req.body;

  const studio = await updateStudioService(studioId, studioName);

  res.status(HttpStatus.OK).json(studio);
  return;
};

export const deleteStudio = async (req: Request, res: Response) => {
  const { id } = req.params;

  const studio = await deleteStudioService(id as string);

  res.status(HttpStatus.OK).json(studio);
  return;
};

export const getStudio = async (req: Request, res: Response) => {
  const { studioId } = req.params;

  const studio = await getStudioByIdService(studioId as string);

  res.status(HttpStatus.OK).json(studio);
  return;
};

export const updateStudioSetting = async (req: Request, res: Response) => {
  const { studioId, settingName, settingValue } = req.body;

  const studio = await updateStudioService(studioId, {
    [settingName]: settingValue,
  });

  res.status(HttpStatus.OK).json(studio);
  return;
};
