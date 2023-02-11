import express from 'express';
const router = express.Router();
import { create_user, get_users, log_in } from '../controllers/userController';
import passport from 'passport';
import { isAdmin } from '../middleware/middleware';

router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, get_users);

router.post('/signup', create_user);
router.post('/login', log_in);

export default router;
