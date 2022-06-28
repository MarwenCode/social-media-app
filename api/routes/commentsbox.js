const Commentbox = require("../models/Commentbox");
const router = require("express").Router();

//Create new conversation 
router.post("/", async(req,res) => {

    const newCommentbox = new Commentbox({
        members:[req.body.senderId, req.body.receiverId],
        postId:req.body.postId,
        comments:req.body
    })
    try {
        const savedCommentbox = await newCommentbox.save();
        res.status(200).json(savedCommentbox)
      
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})


//get a comment of a user
router.get("/:userId", async(req, res) => {
    try {
        const commentbox = await Commentbox.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(commentbox)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})



module.exports = router