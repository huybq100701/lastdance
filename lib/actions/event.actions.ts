"use server"
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Event from "../models/event.model"; 
import Community from "../models/community.model";

interface Params {
  title: string;
  location: string;
  time: Date;
  description: string;
  author: string;
  opponent: string;
  communityId: string | null;
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
  location: string;
  time: Date;
  description: string;
  path: string;
}) {
  try {
    connectToDB();

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    event.title = title;
    event.location = location;
    event.time = time;
    event.description = description;
    await event.save();

    await revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to edit event: ${error.message}`);
  }
}
export async function createEvent({
  title,
  location,
  time,
  description,
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
      title,
      location,
      time,
      description,
      author,
      opponent,
      community: communityIdObject, 
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


export async function deleteEvent(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    const event = await Event.findById(id).populate("author community");

    if (!event) {
      throw new Error("Event not found");
    }
    await Event.deleteOne({ _id: id });

    await User.updateOne(
      { _id: event.author?._id },
      { $pull: { events: id } }
    );
    await User.updateOne(
      { _id: event.opponent?._id },
      { $pull: { events: id } }
    );

    if (event.community) {
      await Community.updateOne(
        { _id: event.community?._id },
        { $pull: { events: id } }
      );
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete event: ${error.message}`);
  }
}

export async function approveEvent(eventId: string, path: string ): Promise<void> {
  try {
    connectToDB();

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    event.approve = true;
    await event.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to approve event: ${error.message}`);
  }
}

export async function fetchEvents(pageNumber = 1, pageSize = 20) {
  try {
    // Connect to the database
    await connectToDB();

    // Calculate the number of events to skip based on the page number and page size
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch events from the database
    const eventsQuery = Event.find({})
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "opponent",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "_id name image",
      });
    const totalEventsCount = await Event.countDocuments({});
    const events = await eventsQuery.exec();
    const isNext = totalEventsCount > skipAmount + events.length;
    return { events, isNext };
  } catch (error) {

 
  }
}