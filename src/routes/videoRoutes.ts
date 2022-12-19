import express from "express";
import {
  create_video,
  get_video,
  videos_list,
} from "../controllers/videoController";

const router = express.Router();

router.get("/", videos_list);
router.get("/:videoid", get_video);

router.post("/create", create_video);

export default router;
