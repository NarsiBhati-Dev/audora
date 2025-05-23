import { type Response, type NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { HttpStatus } from "../utils/HttpStatus";
import type { AuthRequest } from "../utils/request-type";

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers?.authorization;

    if (!accessToken) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Access Denied: No token provided" });
      return;
    }

    const decoded = verifyToken(accessToken);

    if (!decoded) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
      return;
    }

    req.auth = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Authentication Failed" });
    return;
  }
};
