// import { type Response } from "express";
// import { type AuthRequest } from "../utils/request-type";
// import { HttpStatus } from "../utils/HttpStatus";
// import { createTrackService } from "@audora/database/services/track-services";

// export const createTrack = async (req: AuthRequest, res: Response) => {
//   const { title, projectId, trackType } = req.body;

//   if (!title || !projectId || !trackType) {
//     res.status(HttpStatus.BAD_REQUEST).json({
//       success: false,
//       message: "Title, projectId and trackType are required",
//     });
//     return;
//   }

//   try {
//     const track = await createTrackService(title, projectId, trackType);
//     res.status(HttpStatus.CREATED).json({
//       success: true,
//       message: "Track created successfully",
//       data: track,
//     });
//     return;
//   } catch (error) {
//     console.error(error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: "Failed to create track",
//     });
//     return;
//   }
// };

// export const deleteTrack = async (req: AuthRequest, res: Response) => {
//   const { trackId } = req.params;
// };

// export const getTrack = async (req: AuthRequest, res: Response) => {
//   const { trackId } = req.params;
// };

// export const getTracks = async (req: AuthRequest, res: Response) => {
