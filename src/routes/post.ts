import express from 'express';

import { addPost, getAllPosts } from '../controllers/post'

const router = express.Router();

router.route('/').post(addPost);
// router.route('/:uuid').get(getPost);
router.route('/').get(getAllPosts);
// router.route('/:uuid').delete(deletePost);
// router.route('/:uuid').put(updatePost);


export default router