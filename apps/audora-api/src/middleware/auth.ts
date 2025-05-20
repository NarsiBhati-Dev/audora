// import { type Response, type NextFunction } from "express";
// import { verifyToken } from "@repo/backend-common/config";
// import type { AuthRequest } from "../utils/request-type";
// import { JWT_SECRET } from "../config/env";

// export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       res.status(401).json({ message: "Access Denied: No token provided" });
//       return;
//     }

//     const decoded = verifyToken(token, JWT_SECRET as string);

//     if (!decoded) {
//       res.status(401).json({ message: "Invalid Token" });
//       return;
//     }

//     req.auth = { id: decoded.id };

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Authentication Failed" });
//     return;
//   }
// };
