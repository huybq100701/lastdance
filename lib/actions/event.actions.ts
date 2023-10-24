"use server"
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Event from "../models/event.model"; 

interface Params {
  author: string;
  authorName: string;
  communityId: string | null;
  opponent: string;
  opponentName: string;
  title: string;
  location: string;
  time: string;
  description: string;
  path: string;
}

export async function editEvent({
  eventId,
  title,
  location,
  time,
  description,
  path,
}: {
  eventId: string;
  title: string;
  location: string,
  time: string,
  description: string,
  path: string;
}) {
  try {
    connectToDB();

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Thread not found");
    }

    event.title = title;
    event.location = location;
    event.time = time;
    event.description = description;

    await event.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to edit thread: ${error.message}`);
  }
}
export async function createEvent({
  author,
  authorName,
  opponent,
  opponentName,
  title,
  location,
  time,
  description,
  path,
}: Params) {
  try {
    connectToDB();

    const createEvent = await Event.create({
      author,
      authorName,
      opponent,
      opponentName,
      title,
      location,
      time,
      description,
    });

    // await User.findByIdAndUpdate(author, {
    //   $push: { events: createEvent._id },
    // });


    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}