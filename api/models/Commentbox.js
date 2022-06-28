const mongoose = require("mongoose");

const CommentBoxSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      
    },
    postId: {
      type: String,

    },
    comments: {
      type: String,

    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commentbox", CommentBoxSchema);