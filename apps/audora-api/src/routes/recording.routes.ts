import express from "express";
import multer from "multer";

// import { auth } from "../middleware/auth";
import { recordingController } from "../controllers/recording.controller";

const recordingRouter = express.Router();

// recordingRouter.use(auth);
const upload = multer();

recordingRouter.post("/chunks", upload.single("chunk"), recordingController);

export default recordingRouter;
