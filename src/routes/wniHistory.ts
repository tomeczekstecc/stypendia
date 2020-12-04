import express from 'express';

import { addWniHistory,  getAllWniHistory } from '../controllers/wniHistory';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addWniHistory);
// router.route('/:uuid').get(getPost);
router.route('/').get(getAllWniHistory);
// router.route('/:uuid').delete(deletePost);
// router.route('/:uuid').put(updatePost);

export default router;
