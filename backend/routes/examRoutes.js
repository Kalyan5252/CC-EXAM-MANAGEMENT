import express from 'express';
import {
  getExams,
  createExam,
  updateExam,
  getExam,
} from '../controllers/examController.js';
import { LoggedIn } from '../controllers/authController.js';

const router = express.Router();

// console.log('router');
router.use(LoggedIn);
router.get('/', getExams);
router.get('/:id', getExam);
router.post('/', createExam);
router.patch('/update/:id', updateExam);

export default router;
