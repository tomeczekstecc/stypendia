import express from 'express';

import { addSubmit, editSubmit, getAllSubmits, getAllUsersSubmits, getOneUserSubmit } from '../controllers/submit';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addSubmit);
router.route('/').get(auth,getAllSubmits);
router.route('/usersubmits/:uuid').get(auth,getOneUserSubmit);
router.route('/').put(auth,editSubmit);
router.route('/usersubmits').get(auth,getAllUsersSubmits);

export default router;
