import express from 'express';

import { addSubmitHistory,  getAllSubmitsHistory } from '../controllers/submitHistory';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addSubmitHistory);
// router.route('/:uuid').get(getPost);
router.route('/').get(getAllSubmitsHistory);
// router.route('/:uuid').delete(deletePost);
// router.route('/:uuid').put(updatePos

export default router;
