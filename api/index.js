const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const commentBoxRoute = require("./routes/commentsbox");
const commentRoute = require("./routes/comments")
const messageRoute = require("./routes/messages");
const path = require("path");
const multer = require("multer");



dotenv.config();

// mongoose.connect("mongodb+srv://Marwen:marwen@cluster0.uwqgc.mongodb.net/?retryWrites=true&w=majority",
//  { useNewUrlParser:true }, () => {
//      console.log("connectedd to MongoDB")

// });
mongoose.connect("mongodb+srv://marwen:marwen@socialmedia.kjmvp.mongodb.net/?retryWrites=true&w=majority",
 { useNewUrlParser:true }, () => {
     console.log("connectedd to MongoDB")

});

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

console.log()

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/commentsbox", commentBoxRoute);
app.use("/api/comments", commentRoute);
app.use("/api/messages", messageRoute);


// app.get("/",(req,res) => {
//    res.send("from backend")
   

// })


app.listen(8000,() => {
    console.log("back end server is running");
    console.log("test")


})

