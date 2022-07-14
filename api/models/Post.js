
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    // commentBox: {
    //   // type: Object
    //   type: Array,
    //   default: [],
    // },
   comments: {
      type: [
        {
          commenterId:String,
          username: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);