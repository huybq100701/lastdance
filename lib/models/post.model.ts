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

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
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
  parentId: {
    type: String,
  },
  reactions: [reactionSchema],
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

postSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

postSchema.virtual("repliesCount").get(function () {
  return this.children.length;
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
