import express from 'express';

import {
  addDraft,
  editDraft,
  getAllDrafts,
  getAllUsersDrafts,
} from '../controllers/draft';
import { auth } from '../middleware';

import csrf from 'csurf';
const csrfProtection = csrf();

const router = express.Router();

router.route('/').post(csrfProtection, auth, addDraft);
router.route('/').get(csrfProtection, auth, getAllDrafts);
router.route('/oneuser').get(csrfProtection, auth, getAllUsersDrafts);
router.route('/:id').put(csrfProtection, auth, editDraft);

export default router;
