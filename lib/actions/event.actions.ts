import { connectToDB } from '../mongoose';
import Event from '../models/event.model';
import { Model, Document } from 'mongoose';
import { revalidatePath } from 'next/cache';

interface UserDocument extends Document {
  _id: string;
  events: string[];
  // other fields
}

const User: Model<UserDocument> = require('../models/user.model').default;

export async function createEvent({
  title,
  location,
  currentUserId,
  opponentId,
  eventTime,
  description,
  path,
}: {
  title: string;
  location: string;
  currentUserId: string;
  opponentId: string;
  eventTime: Date;
  description: string;
  path: string;
}) {
  try {
    connectToDB();

    const createdEvent = await Event.create({
      title,
      location,
      currentUserId,
      opponentId,
      eventTime,
      description,
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { events: createdEvent._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create event: ${error.message}`);
  }
}

export async function editEvent({
  eventId,
  title,
  location,
  eventTime,
  description,
  path,
}: {
  eventId: string;
  title: string;
  location: string;
  eventTime: Date;
  description: string;
  path: string;
}) {
  try {
    connectToDB();

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    event.title = title;
    event.location = location;
    event.eventTime = eventTime;
    event.description = description;

    await event.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to edit event: ${error.message}`);
  }
}
