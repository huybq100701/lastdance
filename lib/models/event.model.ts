import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  location:{
    type: String,
    required: true,
  },
  time:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opponent:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
