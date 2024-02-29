import Users from './../models/userModel.js';
import catchAsync from './../utility/catchAsync.js';

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();
  if (users) {
    res.status(200).json({
      status: 'success',
      results: users.length,
      users,
    });
  }
});

export const getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  // console.log(req);
  if (req.cookies) {
    // console.log(req.headers.cookies);
    // console.log('cook:');
    // console.log(req.headers.cookies);
  }
  const user = await Users.findById(id);
  if (user) {
    res.status(200).json({
      status: 'success',
      user,
    });
  }
});

export const createUser = catchAsync(async (req, res, next) => {
  // const user = req.body;
  // console.log(req.body);
  const user = await Users.create(req.body);
  if (user)
    res.status(200).json({
      status: 'success',
      message: 'New User Created',
      user,
    });
});

export const getCompleteUser = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  console.log(id);
  const user = await Users.findById(id).populate({
    path: 'exams',
    select: '_id -timeline -eligibility -description  -registrations',
  });
  if (user) {
    res.status(200).json({
      status: 'success',
      user,
    });
  }
});
