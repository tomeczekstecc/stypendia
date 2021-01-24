import express from 'express';

import { addSubmitHistory,  getAllSubmitsHistory } from '../controllers';
import { auth } from '../middleware';
import csrf from 'csurf';
const csrfProtection = csrf();
const router = express.Router();

router.route('/').post(csrfProtection,auth, addSubmitHistory);
// router.route('/:uuid').get(getPost);
router.route('/').get(csrfProtection,getAllSubmitsHistory);
// router.route('/:uuid').delete(deletePost);
// router.route('/:uuid').put(updatePos

export default router;
