import express from 'express';

import { addWniosek, getAllPosts } from '../controllers/wniosek';
import { auth } from '../middleware';

const router = express.Router();

router.route('/').post(auth, addWniosek);
// router.route('/:uuid').get(getPost);
router.route('/').get(getAllPosts);
// router.route('/:uuid').delete(deletePost);
// router.route('/:uuid').put(updatePost);

export default router;
