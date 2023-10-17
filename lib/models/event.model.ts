import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  currentUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opponentId: {
    type: mongoose.Schema.Types.ObjectId,
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

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
