import express from 'express';

import { addWniosek,  getAllWni } from '../controllers/wniosek';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addWniosek);
// router.route('/:uuid').get(getPost);
router.route('/').get(getAllWni);
// router.route('/:uuid').delete(deletePost);
// router.route('/:uuid').put(updatePost);

export default router;
