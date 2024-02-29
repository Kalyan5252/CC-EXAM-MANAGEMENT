import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Account requires UserName'],
    },
    email: {
      type: String,
      required: [true, 'Email Address required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Provide a valid Email'],
    },
    year: {
      type: Number,
      required: [true, "Student's study of Year is required"],
    },
    regNo: {
      type: String,
      unique: true,
      required: [true, 'Student should have a Registered Number'],
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      required: [true, 'Account Type Required'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [false],
    },
    branch: {
      type: String,
      enum: ['cse', 'it', 'ece', 'eee', 'mech', 'civil'],
      lowercase: true,
    },
    college: {
      type: String,
      required: [false, 'college may be required'],
    },
    mobile: {
      type: Number,
      required: [false, 'Mobile Number is optional'],
    },
    password: {
      type: String,
      required: [true, 'Please provide Password'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide Confirm Password'],
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords doesn't match",
      },
    },
    passwordRestToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    exams: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'exams',
      },
    ],
    events: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'events',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^find/, async function (next) {
  this.find().select('-__v');
  // .populate({
  //   path: 'exams',
  //   select: '_id -timeline -eligibility -description  -registrations',
  // });
  next();
});

// userSchema.virtual('exams', {
//   ref: 'exams',
//   foreignField: 'registrations',
//   localField: '_id',
//   justOne: false,
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  console.log('user req1');
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  loginPassword,
  userPassword
) {
  return await bcrypt.compare(loginPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

const userModel = mongoose.model('users', userSchema);
export default userModel;
