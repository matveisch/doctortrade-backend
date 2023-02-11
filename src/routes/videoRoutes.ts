import express from 'express';
import passport from 'passport';
import {
  create_video,
  get_video,
  get_video_data,
  set_video_watch_status,
  videos_list,
} from '../controllers/videoController';
import { isAdmin } from '../middleware/middleware';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), videos_list);
router.get('/:videoid', passport.authenticate('jwt', { session: false }), get_video);
router.get('/videoData/:videoid', passport.authenticate('jwt', { session: false }), get_video_data);
router.post('/create', passport.authenticate('jwt', { session: false }), isAdmin, create_video);
router.put('/:videoid/watchStatus', passport.authenticate('jwt', { session: false }), set_video_watch_status);

export default router;
