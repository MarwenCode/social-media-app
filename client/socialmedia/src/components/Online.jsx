// import { Users } from "../DataUsers";
import { useState, useEffect } from "react";
import axios from "axios";


const Online = ({user, currentId}) => {
  const PF = "http://localhost:8000/images/"

  const [friends, setFriends] = useState([]);
  // const [onlineFriends, setOnlineFriends] = useState([]);
  // const PF = "http://localhost:8000/images/";

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);
  console.log(friends)
  
  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
      <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
      <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUsername">{user.username}</span>
  </li>
);
    
  
}

export default Online