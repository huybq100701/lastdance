import mongoose, { Schema, Document } from "mongoose";

export interface EventDocument extends Document {
  title: string;
  location: string;
  currentUserId: mongoose.Types.ObjectId;
  opponentId: mongoose.Types.ObjectId;
  description?: string;
  createdAt?: Date;
  eventTime: string;
}

const eventSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  currentUserId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opponentId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventTime: {
    type: String,
    required: true,
  },
});

const Event = mongoose.models.Event as mongoose.Model<EventDocument> || mongoose.model<EventDocument>("Event", eventSchema);

export default Event;
