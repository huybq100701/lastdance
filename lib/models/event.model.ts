import mongoose, { Schema, Document } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  currentUserId: {
    type: String,
    required: true,
  },
  currentUserInfo: {
    type: String,
    required: true,
  },
  opponentId: {
    type: String,
    required: true,
  },
  opponentInfo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventTime: {
    type: Date,
    required: true,
  },
});

export interface EventDocument extends Document {
  title: string;
  location: string;
  currentUserId: string;
  currentUserInfo: string;
  opponentId: string;
  opponentInfo: string;
  description: string;
  createdAt: Date;
  eventTime: Date;
}

const Event = mongoose.models.Event as mongoose.Model<EventDocument> || mongoose.model<EventDocument>("Event", eventSchema);

export default Event;
