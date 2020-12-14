import express from 'express';
import {
  addUserHistory
} from '../controllers/userHistory';
import {auth } from '../middleware';
const router = express.Router();

router.route('/:uuid').post(auth, addUserHistory); // create user


export default router;
