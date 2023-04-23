import express from 'express';
const router = express.Router();
import {
  add_course,
  change_password,
  create_user,
  get_user,
  get_users,
  log_in,
  update_user,
  update_user_email,
  verify,
  remove_course,
  handle_logout,
  add_book,
  remove_book,
} from '../controllers/userController';
import passport from 'passport';
import { isAdmin } from '../middleware/middleware';

router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, get_users);
router.get('/:userid', passport.authenticate('jwt', { session: false }), get_user);
router.get('/verify/:token', verify);

router.put('/:userid', passport.authenticate('jwt', { session: false }), update_user);
router.put('/:userid/updateEmail', passport.authenticate('jwt', { session: false }), update_user_email);
router.put('/:userid/changePassword', passport.authenticate('jwt', { session: false }), change_password);
router.put('/:userid/addCourse', passport.authenticate('jwt', { session: false }), add_course);
router.put('/:userid/removeCourse', passport.authenticate('jwt', { session: false }), isAdmin, remove_course);
router.put('/:userId/addBook', add_book);
router.put('/:userId/removeBook', remove_book);

router.post('/signup', create_user);
router.post('/login', log_in);
router.put('/:userid/handleLogout', passport.authenticate('jwt', { session: false }), handle_logout);

export default router;
