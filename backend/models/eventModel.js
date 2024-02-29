import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is Required'],
  },
  eventDate: {
    type: Date,
    required: [true, 'Event Dates are necessesary'],
  },
  description: {
    type: String,
    required: [true, ''],
  },
  venue: {
    type: String,
    required: [true, 'Venue Required'],
  },
  sponsors: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: [false],
  },
  registrations: [{ type: mongoose.Schema.ObjectId, ref: 'users' }],
});

eventSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  const eventId = update._id || this.getQuery()._id; // Get exam ID from update or query
  const event = await this.model.findOne({ _id: eventId });
  // console.log(exam);

  if (!event) {
    // If exam is not found, handle accordingly
    return next(new Error('Exam not found'));
  }
  const regs = event.registrations;
  const regs1 = new Set(regs.map((id) => id.toString())); // Convert ObjectId instances to strings
  // console.log('chk reg:', regs);
  // console.log('chk reg1:', regs1);

  const newRegistrations = update.$addToSet.registrations;
  // console.log('newRegs:', newRegistrations);

  if (regs1.has(newRegistrations.toString())) {
    const error = new Error('User already registered for the Event');
    return next(error);
  }
  next();
});

const events = mongoose.model('events', eventSchema);
export default events;
