import express from 'express';
import passport from 'passport';
import { isAdmin } from '../middleware/middleware';
import { create_course, get_courses } from '../controllers/courseController';

const router = express.Router();

router.get('/', get_courses);
router.post('/create', passport.authenticate('jwt', { session: false }), isAdmin, create_course);

export default router;
