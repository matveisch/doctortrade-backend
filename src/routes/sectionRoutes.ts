import express from 'express';
import { create_section, delete_section, get_sections } from '../controllers/sectionController';
import passport from 'passport';
import { isAdmin } from '../middleware/middleware';

const router = express.Router();

router.get('/', get_sections);

router.post('/create', passport.authenticate('jwt', { session: false }), isAdmin, create_section);
router.delete('/:sectionid', passport.authenticate('jwt', { session: false }), isAdmin, delete_section);

export default router;
