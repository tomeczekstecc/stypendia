import express from 'express';
import {
  register,
  login,
  logout,
  me,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from '../controllers/user';
import { guest, auth } from '../middleware';
const router = express.Router();

router.route('/').post(guest, register); // create user
router.route('/login').post(guest, login); // login
router.route('/logout').get(auth, logout); // login
router.route('/me').get(me); // login
router.route('/').get(getAllUsers); // get all user
router.route('/:uuid').get(getOneUser); // get a user
router.route('/:uuid').put(auth, updateUser); // update a user
router.route('/:uuid').delete(deleteUser); // delete a user

export default router;
