import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const threadSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  imageUpload: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  reactions: [reactionSchema],
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

threadSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

threadSchema.virtual("repliesCount").get(function () {
  return this.children.length;
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
