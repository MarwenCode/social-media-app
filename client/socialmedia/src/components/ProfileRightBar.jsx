import React from 'react';
import HomeRightBar from './HomeRightBar';
import Online from './Online';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { Add, Remove } from "@material-ui/icons";
import { Search} from "@material-ui/icons";

const ProfileRightBar = ({ user }) => {
  const PF = "http://localhost:8000/images/";
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

 
  return (
    <div>
      <div className="friendslist">
        <h4 className="rightbarTitle">User friends</h4>
        <div className='searchFriendsList'> 
          <Search  className='searchIcon'/>
          <input placeholder='search for a friend' className='inputSearchFriend'/>
           </div>
      </div>

      <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}>
            <div className="rightbarFollowing">
              <span className="rightbarFollowingName">{friend.username}</span>
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="rightbarFollowingImg"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
  
  
  
  
}

export default ProfileRightBar