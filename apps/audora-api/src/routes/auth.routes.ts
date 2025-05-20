import express from "express";
import {
  register,
  login,
  registerWithGoogle,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", registerWithGoogle);

export default router;
