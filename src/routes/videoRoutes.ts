import express from 'express';
import passport from 'passport';
import { create_video, get_video, get_video_data, videos_list } from '../controllers/videoController';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), videos_list);
router.get('/:videoid', passport.authenticate('jwt', { session: false }), get_video);
router.get('/videoData/:videoid', get_video_data);
router.post('/create', create_video);

export default router;
