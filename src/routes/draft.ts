import express from 'express';

import { addDraft, editDraft, getAllDrafts, getAllUsersDrafts } from '../controllers/draft';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addDraft);
router.route('/').get(auth,getAllDrafts);
router.route('/oneuser').get(auth,getAllUsersDrafts);
router.route('/:id').put(auth,editDraft);

export default router;
