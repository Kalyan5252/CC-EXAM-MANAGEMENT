import Exams from '../models/examModel.js';
import Users from '../models/userModel.js';
import catchAsync from '../utility/catchAsync.js';
import AppError from '../utility/AppError.js';
import sendEmail from '../utility/email.js';

export const getExams = catchAsync(async (req, res, next) => {
  const exams = await Exams.find();
  if (exams) {
    res.status(200).json({
      status: 'success',
      results: exams.length,
      exams,
    });
  }
});

export const createExam = catchAsync(async (req, res, next) => {
  const data = req.body;
  // console.log('datak', data);
  //   if(data){
  //   console.log(data);
  const exam = await Exams.create(data);
  // const exam = await new Exams(data);
  // const exam = null;
  console.log(exam);
  if (exam) {
    res.status(200).json({
      status: 'success',
      message: 'Exam Created',
      exam,
    });
  }
  //   }
});

export const getExam = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const exam = await Exams.findById(id);
  if (exam) {
    res.status(200).json({
      status: 'success',
      exam,
    });
  }
});

export const updateExam = catchAsync(async (req, res, next) => {
  let updateData;
  //   console.log(req.user);
  if (req.body.studentId) updateData = req.user.id;
  //   const exam = await Exams.findById(req.params.id);
  const updatedExam = await Exams.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { registrations: req.user.id } },
    { new: true }
  ).populate({
    path: 'registrations',
    select: '-__v',
  });
  // const updatedExam = await Exams.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     $push: { registrations: req.user._id },
  //   },
  //   { new: true }
  // ).populate({
  //   path: 'registrations',
  //   select: '-__v',
  // });

  await Users.findByIdAndUpdate(req.user.id, {
    $push: { exams: req.params.id },
  });
  // console.log(updatedExam);
  if (updatedExam) {
    await sendEmail({
      email: req.user.email,
      subject: `your Application to ${updatedExam.title} is Successful..`,
      user: req.user,
      exam: updatedExam.title,
      date: updatedExam.examDate,
    });

    res.status(200).json({
      status: 'success',
      updatedExam,
    });
  }
});
