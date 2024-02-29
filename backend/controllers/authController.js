import Users from './../models/userModel.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { promisify } from 'util';
import AppError from '../utility/AppError.js';
import catchAsync from '../utility/catchAsync.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (statusCode, user, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

export const Login = catchAsync(async (req, res, next) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  //   console.log(data);
  if (!email || !password)
    return next(new AppError('Provide Email and Password', 400));
  const user = await Users.findOne({ email }).select('+password');
  //   console.log(user);
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Wrong Credentials', 401));
  createSendToken(201, user, res);
});

export const LoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.cookies) {
    token = req.headers.cookies;
    // res.cookie('jwt', null);
  }
  // console.log(token);
  if (!token)
    return next(
      new AppError(
        'Your are not Logged in to access Data. Please Login to Continue',
        400
      )
    );
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    const currentUser = await Users.findById(decoded.id);
    if (!currentUser) return next();
    if (currentUser.changedPasswordAfter(decoded.iat)) return next();
    res.locals.user = currentUser;
    req.user = currentUser;
    return next();
  } catch (err) {
    return next(err);
  }
  return next(new AppError('You are not logged in,Please Login...', 400));
});

export const signUp = catchAsync(async (req, res, next) => {
  const data = req.body;
  // console.log(data);
  const user = await Users.create(data);
  if (user) createSendToken(200, user, res);
});

export const logOut = catchAsync(async (req, res) => {
  if (req.cookies.jwt) {
    res.cookie('jwt', null);
    res.status(200).json({
      status: 'success',
      message: 'User Logged out Successfully',
    });
  }
  res.status(401).json({
    message: 'Your are not Logged in',
  });
});

export const studentLogin = catchAsync(async (req, res, next) => {
  // const admins =
});
