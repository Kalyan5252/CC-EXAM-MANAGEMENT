import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Exam Title is Requied'],
  },
  examDate: {
    type: Date,
    required: [true, 'Exam Date is required'],
  },
  lastdate: {
    type: Date,
    required: [false],
  },
  description: {
    type: String,
    required: [true, 'Exam needs a description'],
  },
  timeline: [
    {
      date: {
        type: Date,
      },
      event: {
        type: String,
      },
    },
  ],
  eligibility: [
    {
      title: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  registrations: [{ type: mongoose.Schema.ObjectId, ref: 'users' }],
});

examSchema.pre('findByIdAndUpdate', async function (next) {
  console.log('Pre middleware for findByIdAndUpdate is executing');
  const update = this.getUpdate();
  // Middleware logic here
  next();
});

examSchema.pre('save', function (next) {
  const exam = this;
  const registrationsSet = new Set(exam.registrations);
  console.log(registrationsSet);
  if (registrationsSet.size !== exam.registrations.length) {
    // If Set size is not equal to array length, it means there are duplicates
    const error = new Error('Duplicate user registrations are not allowed');
    return next(error);
  }
  next();
});

//CHAT GPT CODE TO PREVENT REGISTRATION (NOT WORKING)
// examSchema.pre('save', async function (next) {
//   const exam = this;
//   console.log('chk_1');
//   if (!exam.isModified('registrations')) return next();

//   const existingRegistrations = await exams.findOne({
//     id: exam.id,
//     registrations: exam.registrations,
//   });
//   console.log(existingRegistrations);
//   if (existingRegistrations) {
//     const error = new Error('User is already registered for this exam');
//     return next(error);
//   }
//   next();
// });

// examSchema.index({ registrations: 1, id: 1 }, { unique: true });

// examSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'registrations',
//     select: '-exams -events',
//   });
//   next();
// });
examSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  const examId = update._id || this.getQuery()._id; // Get exam ID from update or query
  const exam = await this.model.findOne({ _id: examId });
  // console.log(exam);

  if (!exam) {
    // If exam is not found, handle accordingly
    return next(new Error('Exam not found'));
  }
  const regs = exam.registrations;
  const regs1 = new Set(regs.map((id) => id.toString())); // Convert ObjectId instances to strings
  // console.log('chk reg:', regs);
  // console.log('chk reg1:', regs1);

  const newRegistrations = update.$addToSet.registrations;
  // console.log('newRegs:', newRegistrations);

  if (regs1.has(newRegistrations.toString())) {
    const error = new Error('User already registered for the Exam');
    return next(error);
  }

  next();
});

const exams = mongoose.model('exams', examSchema);

export default exams;
