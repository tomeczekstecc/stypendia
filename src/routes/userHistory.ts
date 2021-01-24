import express from 'express';
import {
  addUserHistory
} from '../controllers';
import {auth } from '../middleware';
import csrf from 'csurf';
const csrfProtection = csrf();
const router = express.Router();

router.route('/:uuid').post(auth, csrfProtection,addUserHistory); // create user


export default router;
