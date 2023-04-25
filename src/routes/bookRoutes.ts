import express from 'express';
import { create_book, get_book, get_book_info, get_books, update_book } from '../controllers/bookController';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', get_books);
router.get('/:pathTitle', get_book);
router.get('/bookInfo/:id', get_book_info);
router.post('/', create_book);
router.put('/:bookId', update_book);

export default router;
