import express from "express";
import { auth } from "../middleware/auth";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller";

const projectRouter = express.Router();

projectRouter.use(auth);

projectRouter.post("/create", createProject);
projectRouter.put("/update/:projectId", updateProject);
projectRouter.delete("/delete/:projectId", deleteProject);
projectRouter.get("/get/:projectId", getProject);
projectRouter.get("/get-all/:studioId", getProjects);

export default projectRouter;
