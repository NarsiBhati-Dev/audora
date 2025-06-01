import express from "express";

import { auth } from "../middleware/auth";
import { setProfileName } from "../controllers/profile.controller";

const profileRouter = express.Router();

profileRouter.use(auth);

profileRouter.put("/update-name", setProfileName);

export default profileRouter;
