import express from 'express';
import {
  addUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from '../controllers/user';
import { guest } from '../middleware';
const router = express.Router();

router.route('/').post(guest,addUser); // create user
router.route('/').get(getAllUsers); // get all user
router.route('/:uuid').get(getOneUser); // get a user
router.route('/:uuid').put(updateUser); // update a user
router.route('/:uuid').delete(deleteUser); // delete a user

export default router;
