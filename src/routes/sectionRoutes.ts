import express from 'express';
import { create_section, delete_section, get_sections } from '../controllers/sectionController';

const router = express.Router();

router.get('/', get_sections);

router.post('/create', create_section);
router.delete('/:sectionid', delete_section);

export default router;
