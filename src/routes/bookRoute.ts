import express from 'express';
import { get_book } from '../controllers/bookController';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', get_book);

export default router;
