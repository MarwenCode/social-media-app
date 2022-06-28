
import { MoreVert } from "@material-ui/icons";
// import { Users } from "../DataUsers";
// import { Posts } from "../DataPosts";
import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { DeleteIcon } from "@material-ui/icons";
import {FaTrashAlt, FaWindows} from "react-icons/fa";
// import Comments from "./AddComment";

import Comment from "./Comment";





const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  // const [post, setPost] = useState({})
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = "http://localhost:8000/images/";
  const [commentbox, setCommentBox] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment]= useState("")

  console.log(commentbox)
  console.log(comments)

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  console.log(user);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { userId: currentUser._id },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(handleDelete);

  //add Comments

  //get comments Box

  useEffect(() => {
    const getCommentBox = async() => {
      try {
        const res = await axios.get(`/commentboxId/${post._id}`);
        setCommentBox(res.data)
        console.log(res.data)
        
      } catch (error) {
        console.log(error)
        
      }

    }
    getCommentBox()
  }, [post._id])
  
  

  //get Messages 

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get("/comments/" + commentbox._id);
        setComments(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, [commentbox._id]);


  // new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      sender: user._id,
      text: newComment,
      // commentboxId: commentboxId
    };
  
  
    try {
      const res = await axios.post("/comments", comment);
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };








  //   const [showAddTask, SetShowAddTask] = useState(false)
  //   const [comments, SetComments] = useState([
  //       {
  //           id: 1,
  //           text: "Doctors Appointment",

  //         },
  //         {
  //           id: 2,
  //           text: "Meeting at School",

  //         }

  // ])

  // const addTask = (comment) => {
  //   const id = Math.random() * 100;
  //   const newComment = { ...comment, id };
  //   SetComments([...comments, newComment]);
  //   console.log(newComment);
  // };

  // const submitComment = () => {
  //   console.log("test")

  // }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />

            <span className="postLikeCounter">{like}like it</span>
          </div>
          <div className="deletePost">
            <FaTrashAlt onClick={handleDelete} />
          </div>
         



        </div>
        <button className="sowComment">show comments</button>
        <div className="postFooterSection">
            <textarea className="comments"/>
            <button onClick={handleSubmit}>send</button>
          </div>
         

          <div >
            
          {commentbox.map((comment) => (
              <div >
               <Comment comment={comment}  />
              
              </div>
            ))}
           

            
          </div>
      </div>
    </div>
  );
};

export default Post;





  