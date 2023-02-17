import express from 'express';
const router = express.Router();
import {
  change_password,
  create_user,
  get_user,
  get_users,
  log_in,
  update_user,
  update_user_email,
  verify,
} from '../controllers/userController';
import passport from 'passport';
import { isAdmin } from '../middleware/middleware';

router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, get_users);
router.get('/:userid', passport.authenticate('jwt', { session: false }), get_user);
router.get('/verify/:token', verify);

router.put('/:userid', passport.authenticate('jwt', { session: false }), update_user);
router.put('/:userid/updateEmail', passport.authenticate('jwt', { session: false }), update_user_email);
router.put('/:userid/changePassword', passport.authenticate('jwt', { session: false }), change_password);

router.post('/signup', create_user);
router.post('/login', log_in);

export default router;
