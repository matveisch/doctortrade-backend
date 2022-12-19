"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var videoController_1 = require("../controllers/videoController");
var router = express_1.default.Router();
router.get("/", videoController_1.videos_list);
router.get("/:videoid", videoController_1.get_video);
router.post("/create", videoController_1.create_video);
exports.default = router;
