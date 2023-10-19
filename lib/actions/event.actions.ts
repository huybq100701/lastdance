import Event from "../models/event.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";

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
    // await connecttoDB();

    const event = await Event.findById(eventId);

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
   // await connecttoDB();

    // if(Event){

    const newEvent = new Event();

    console.log({
      title,
      location,
      currentUserId,
      opponentId,
      eventTime,
      description,
      path,
    });

    newEvent.title = title;
    newEvent.location = location;
    newEvent.author = currentUserId;
    newEvent.opponent = opponentId;
    newEvent.eventTime = eventTime;
    newEvent.description = description;

    const createdEvent =  await newEvent.save();
      // const createdEvent = await Event.create({
      //   title,
      //   location,
      //   author: currentUserId,
      //   opponent: opponentId,
      //   eventTime,
      //   description,
      // });

    console.log(createdEvent)
  
      await User.findByIdAndUpdate(currentUserId, {
        $push: { events: createdEvent._id },
      });
    // }

    // const createdEvent = await Event.create({
    //   title,
    //   location,
    //   author: currentUserId,
    //   opponent: opponentId,
    //   eventTime,
    //   description,
    // });

    // await User.findByIdAndUpdate(currentUserId, {
    //   $push: { events: createdEvent._id },
    // });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create event: ${error.message}`);
  }
}
