import express from 'express';
const router = express.Router();
import { create_user, get_users, log_in } from '../controllers/userController';

router.get('/users', get_users);

router.post('/signup', create_user);
router.post('/login', log_in);

export default router;
