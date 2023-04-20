import express from 'express';
import { create_note, delete_note, get_notes } from '../controllers/noteController';

const router = express.Router();

router.get('/', get_notes);
router.post('/create', create_note);
router.delete('/:noteId', delete_note);

export default router;
