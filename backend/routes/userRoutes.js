import Users from './../models/userModel.js';
import express from 'express';
import {
  getUsers,
  createUser,
  getUser,
  getCompleteUser,
} from './../controllers/userController.js';
import {
  Login,
  LoggedIn,
  signUp,
  logOut,
} from './../controllers/authController.js';

const router = express.Router();
router.post('/login/', Login);
router.post('/signup/', signUp);

router.post('/', createUser);
router.get('/', LoggedIn, getUsers);
router.get('/getCompleteUser', LoggedIn, getCompleteUser);
router.get('/logout', LoggedIn, logOut);
router.get('/:id', LoggedIn, getUser);

export default router;
