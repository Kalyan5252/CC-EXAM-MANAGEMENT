import Events from '../models/eventModel.js';
import catchAsync from '../utility/catchAsync.js';
import AppError from '../utility/AppError.js';

export const getEvents = catchAsync(async (req, res, next) => {
  const events = await Events.find();
  if (events) {
    res.status(200).json({
      status: 'success',
      results: events.length,
      events,
    });
  }
});

export const createEvent = catchAsync(async (req, res, next) => {
  const data = req.body;
  // console.log(data);
  const event = await Events.create(data);
  if (event) {
    res.status(200).json({
      status: 'success',
      message: 'Event created Successfully',
      event,
    });
  }
});

export const updateEvent = catchAsync(async (req, res, next) => {
  const title = req.body.title || '';
  const eventDate = req.body.eventDate || '';
  const description = req.body.description || '';
  const venue = req.body.venue || '';
  const sponsors = req.body.sponsors || '';
  // const venue = req.body.venue || '';
  const updatedEvent = await Events.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'Event Updated!',
    updatedEvent,
  });
});

export const registerEvent = catchAsync(async (req, res, next) => {
  const updatedEvent = await Events.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { registrations: req.user.id } },
    { new: true }
  ).populate({
    path: 'registrations',
    select: '-__v',
  });
  res.status(200).json({
    status: 'success',
    updatedEvent,
  });
});
export const deleteEvent = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedEvent = await Events.findByIdAndDelete(id);
  if (deletedEvent) {
    res.status(200).json({
      status: 'success',
      message: 'Event deleted successfully',
      deletedEvent,
    });
  }
});
