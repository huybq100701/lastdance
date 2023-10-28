"use server"
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Event from "../models/event.model"; 
import Community from "../models/community.model";

interface Params {
  text: string;
  author: string;
  opponent: string;
  communityId: string | null;
  path: string;
}

export async function editEvent({
  eventId,
  text,
  path,
}: {
  eventId: string;
  text: string;
  path: string;
}) {
  try {
    connectToDB();

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    event.text = text;

    await event.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to edit event: ${error.message}`);
  }
}
export async function createEvent({
  text,
  author,
  opponent,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdEvent = await Event.create({
      text,
      author,
      community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { events: createdEvent._id },
    });
    await User.findByIdAndUpdate(opponent, {
      $push: { events: createdEvent._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { events: createdEvent._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create event: ${error.message}`);
  }
}

export async function fetchEventById(eventId: string) {
  connectToDB();

  try {
    const event = await Event.findById(eventId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
     
      .exec();

    return event;
  } catch (err) {
    console.error("Error while fetching event:", err);
    throw new Error("Unable to fetch event");
  }
}
