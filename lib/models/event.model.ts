import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  currentUserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opponentId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventTime: {
    type: Date,
    required: true,
  },
});


const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
