const express = require("express");
const router = express.Router();
const video_controller = require("../controllers/videoController");

router.get("/", video_controller.videos_list);
router.get("/:videoid", video_controller.get_video);

module.exports = router;
