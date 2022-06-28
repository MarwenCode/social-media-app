const Comment = require("../models/Comment");
const router = require("express").Router();

//Create new message 
router.post("/", async(req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
        
    } catch(error) {
        res.status(500).json(error)
        
    }
})

//get comments

router.get("/:commentboxId/", async (req, res) => {
  try {
    const comments = await Comment.find({
        commentboxId: req.params.commentboxId,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});




module.exports = router