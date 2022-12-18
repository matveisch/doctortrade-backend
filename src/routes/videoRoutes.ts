import express from "express";
import { get_video, videos_list } from "../controllers/videoController";
const router = express.Router();

router.get("/", videos_list);
router.get("/:videoid", get_video);

export default router;
