const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    commentboxId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);