import express from 'express';

import { addDraft, editDraft, getAllDrafts } from '../controllers/draft';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addDraft);
router.route('/').get(auth,getAllDrafts);
router.route('/:id').put(auth,editDraft);

export default router;
