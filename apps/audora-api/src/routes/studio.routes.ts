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
studioRouter.delete("/delete/:studioId", deleteStudio);
studioRouter.get("/get/:studioId", getStudio);
studioRouter.post("/update-setting", updateStudioSetting);

export default studioRouter;
