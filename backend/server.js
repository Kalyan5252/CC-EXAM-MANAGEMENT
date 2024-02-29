import express from 'express';
import dotenv from 'dotenv';
import errorController from './controllers/errorController.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import AppError from './utility/AppError.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT;

const database = process.env.database.replace('<password>', process.env.dbpass);
// console.log(db);
const DB = mongoose
  .connect(database)
  .then(() => console.log('Established a connection to Database'))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

import userRouter from './routes/userRoutes.js';
import errorHandler from './controllers/errorController.js';
import examRouter from './routes/examRoutes.js';
import eventRouter from './routes/eventRoutes.js';

app.use('/users/', userRouter);
app.use('/exams/', examRouter);
app.use('/events/', eventRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App running on ${port}`);
});
