import express from "express";
import { auth } from "../middleware/auth";
import {
  createStudio,
  deleteStudio,
  getStudio,
  updateStudio,
  updateStudioSetting,
} from "../controllers/studio.controller";

const studioRouter = express.Router();

studioRouter.use(auth);

studioRouter.post("/create", createStudio);
studioRouter.put("/update", updateStudio);
studioRouter.delete("/delete", deleteStudio);
studioRouter.get("/get", getStudio);
studioRouter.post("/update-setting", updateStudioSetting);

export default studioRouter;
