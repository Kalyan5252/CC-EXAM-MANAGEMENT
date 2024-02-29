import express from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerEvent,
} from './../controllers/eventController.js';
import { LoggedIn } from './../controllers/authController.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/update/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);
router.patch('/register/:id', LoggedIn, registerEvent);

export default router;
