import { Schema, model, Document } from 'mongoose';

export interface EventDocument extends Document {
  title: string;
  location: string;
  currentUserId: string;
  opponentId: string;
  eventTime: Date;
  description: string;
}

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
  opponentId: {
    type: String,
    required: true,
  },
  eventTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Event = model<EventDocument>('Event', eventSchema);

export default Event;