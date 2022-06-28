import { Users } from "../DataUsers";
import ProfileRightBar from "./ProfileRightBar";
import Online from "./Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { Search} from "@material-ui/icons";

const HomeRightBar = () => {
  const PF = "http://localhost:8000/images/";

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  // const [followed, setFollowed] = useState(
  //   currentUser.followings.includes(user?.id)
  // );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser._id]);

  // const handleClick = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put(`/users/${user._id}/unfollow`, {
  //         userId: currentUser._id,
  //       });
  //       dispatch({ type: "UNFOLLOW", payload: user._id });
  //     } else {
  //       await axios.put(`/users/${user._id}/follow`, {
  //         userId: currentUser._id,
  //       });
  //       dispatch({ type: "FOLLOW", payload: user._id });
  //     }
  //     setFollowed(!followed);
  //   } catch (err) {
  //   }
  // };
  return (
    <div>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/post/3.jpeg" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/post/1.jpeg" alt="" />
      
      <div className="onLineFriends">
      <h4 className="rightbarFriendsTitle">Online Friends</h4>
      <div className="searchFriendHome">
        <Search className='searchIconFriendHome' />
        <input className="inputIconFriendHome"/>
      </div>

      

          {/* {Users.map((user) => (
             <Online key={user.id} user={user} />
            
           ))} */}
          {/* <Online currentId={user._id} /> */}

          <div className="rightbarFiends">
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}>
                <div className="rightbarFriendsIcons">
                    <span className="rightbarFriendName">
                    {friend.username}
                  </span>
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFriendImg"
                  />
                
                </div>
              </Link>
            ))}
          </div>
      
      </div>
    </div>
  );
};

export default HomeRightBar;
