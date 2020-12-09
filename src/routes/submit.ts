import express from 'express';

import { addSubmit,  getAllSubmits } from '../controllers/submit';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addSubmit);
// router.route('/:uuid').get(getPost);
router.route('/').get(getAllSubmits);
// router.route('/:uuid').delete(deletePost);
// router.route('/:uuid').put(updatePost);

export default router;
