const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  authorName:{
    type: String,
  },
  opponent: {
    type: String,
  },
  opponentName:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
