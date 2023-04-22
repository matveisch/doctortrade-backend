import express from 'express';
import { create_note, delete_note, get_notes, updateNoteName } from '../controllers/noteController';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), get_notes);
router.post('/create', passport.authenticate('jwt', { session: false }), create_note);
router.put('/:noteId', passport.authenticate('jwt', { session: false }), updateNoteName);
router.delete('/:noteId', passport.authenticate('jwt', { session: false }), delete_note);

export default router;
