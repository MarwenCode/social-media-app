import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';


const Conversation = ({conversation, currentUser}) => {
  const [user, setUser] = useState(null)
  const PF = "http://localhost:8000/images/";

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log(friendId)

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);   
        console.log(res)
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  




  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture ?  PF+user.profilePicture : PF+"noAvatar.png"}
        // src={PF+"noAvatar.png"}
        alt=""
      />

      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation


