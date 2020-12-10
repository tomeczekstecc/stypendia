import express from 'express';

import { addSubmit, editSubmit, getAllSubmits } from '../controllers/submit';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addSubmit);
router.route('/').get(auth,getAllSubmits);
router.route('/:id').put(auth,editSubmit);

export default router;
