import express from 'express';

import { addSubmit, editSubmit, getAllSubmits, getAllUsersSubmits } from '../controllers/submit';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addSubmit);
router.route('/').get(auth,getAllSubmits);
router.route('/:id').put(auth,editSubmit);
router.route('/oneuser').get(auth,getAllUsersSubmits);

export default router;
