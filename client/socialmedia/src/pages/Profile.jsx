import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import RightBar from "../components/HomeRightBar";
import ProfileRightBar from "../components/ProfileRightBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Settings from "../components/Settings"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const Profile = () => { 

  const [file, setFile] = useState(null);
  const [user, setUser] = useState({})
  const PF = "http://localhost:8000/images/";
  // const params = useParams()

  const username = useParams().username

  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  // useEffect(() => {
  //   localStorage.setItem('followed', JSON.stringify(followed));
  // }, [followed]);

  // useEffect(() => {
  //   const follow = JSON.parse(localStorage.getItem('followed'));
  //   if (follow) {
  //     setFollowed(followed);
  //   }
  // }, []);


  useEffect(() => {
    const fetchPosts = async() => {

      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchPosts()
  },[username])

  // const UpdatePhoto = async (e) => {
  //   e.preventDefault();
  //   const updatedUser = {
  //     userId: user._id,
  //     // username,
  //     // email,
  //     // password,
  //   };
  //   if (file) {
  //     const data = new FormData();
  //     const fileName = Date.now() + file.name;
  //     data.append("name", fileName);
  //     data.append("file", file);
  //     updatedUser.profilePicture = fileName;
    
  //     try {
  //       await axios.post("/upload", data);
  //     } catch (err) {}
  //   }
  //   try {
  //      await axios.put("/users/" + user._id, updatedUser);
  //     window.location.reload();
  //   } catch (err) {}

  // };

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };
  
  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />

              <div className="profilerightbar">
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                  <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                  </div>
                  <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                  </div>
                  <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">
                      {user.relationship === 1
                        ? "Single"
                        : user.relationship === 1
                        ? "Married"
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
              {/* </Link>
            <Link to="/settings">
           
            </Link> */}

              <img
                className="profileUserImg"
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
              {/* <button className="updateImage" onClick={UpdatePhoto}  type="file"
           >Update photo</button> */}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <Link className="link"  to={`/settings/${user.username}`}>
                {username == currentUser.username && (
                  <button className="updateBtn" >update profile </button>
                )}
              </Link>
              <span className="profileInfoDesc">{user.desc}</span>
              {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick} >
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove /> : <Add />}
                </button>
              )}
            </div>
          </div>

          <div className="profileRightBottom">
            <Feed username={username} />
            <ProfileRightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile