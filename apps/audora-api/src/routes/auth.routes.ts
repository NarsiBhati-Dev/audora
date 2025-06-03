import express from "express";
import {
  register,
  login,
  registerWithGoogle,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/google", registerWithGoogle);

export default authRouter;
