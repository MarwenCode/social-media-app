const Comment = require("../models/Comment");
const Post = require("../models/Post");
const router = require("express").Router();
const ObjectID = require("mongoose").Types.ObjectId;

//Create new comment 
// router.post("/", async(req, res) => {
//     const newComment = new Comment(req.body);
//     try {
//         const savedComment = await newComment.save();
//         res.status(200).json(savedComment)
        
//     } catch(error) {
//         res.status(500).json(error)
        
//     }
// })

router.patch("/comment-post/:id", async(req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
 
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            userId: req.body.userId,
            username: req.body.username,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
})











//get comments

// router.get("/:commentId/", async (req, res) => {
//   try {
//     const comments = await Comment.find({
//         commentId: req.params.commentId,
//     });

//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });




module.exports = router