import express from 'express';
import { create_book, get_book, get_book_info, get_books, update_book } from '../controllers/bookController';
import dotenv from 'dotenv';
import passport from 'passport';
import { isAdmin } from '../middleware/middleware';
dotenv.config();

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), get_books);
router.get('/:pathTitle', passport.authenticate('jwt', { session: false }), get_book);
router.get('/bookInfo/:id', passport.authenticate('jwt', { session: false }), get_book_info);
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, create_book);
router.put('/:bookId', passport.authenticate('jwt', { session: false }), isAdmin, update_book);

export default router;
