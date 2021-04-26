import express from 'express';
import {
  register,
  login,
  logout,
  me,
  deleteUser,
  // getAllUsers,
  getOneUser,
  updateUser,
} from '../controllers';
import { guest, auth } from '../middleware';
import csrf from 'csurf';
const csrfProtection = csrf();
const router = express.Router();

router.route('/').post(csrfProtection, guest, register); // create user
router.route('/login').post(csrfProtection,guest, login); // login
router.route('/logout').get(auth, logout); // login
router.route('/me').get(csrfProtection, me); // login
// router.route('/').get(getAllUsers); // get all user
router.route('/:uuid').get(csrfProtection, auth, getOneUser); // get a user
router.route('/:uuid').put(csrfProtection, auth, deleteUser); // update a user
// router.route('/:uuid').delete(csrfProtection, auth, deleteUser); // delete a user

export default router;
