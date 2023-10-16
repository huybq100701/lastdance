import { connectToDB } from "../mongoose";
import EventThread from "../models/event.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

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

    const createdEvent = await EventThread.create({
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

    const event = await EventThread.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
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
