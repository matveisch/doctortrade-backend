import express from 'express';
import { create_video, get_video, get_video_data, videos_list } from '../controllers/videoController';

const router = express.Router();

router.get('/', videos_list);
router.get('/:videoid', get_video);
router.get('/videoData/:videoid', get_video_data);
router.post('/create', create_video);

export default router;
