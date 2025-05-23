import express from "express";

import { auth } from "../middleware/auth";
import { setProfileName } from "../controllers/profile.controller";

const router = express.Router();

router.use(auth);

router.post("/update-name", setProfileName);

export default router;
