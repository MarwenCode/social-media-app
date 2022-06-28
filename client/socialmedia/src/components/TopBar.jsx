import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { UseGlobalContext } from "../context/AuthContext";
// import ReactSwitch from "react-switch";
import ReactSwitchBtn from "./ReactSwitchBtn";
import axios from "axios";
import Post from "./Post";

const TopBar = ({post}) => {
  // const { user } = UseGlobalContext()
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const { user, dispatch, theme, setTheme, toggleTheme } =
    useContext(AuthContext);
  const PF = "http://localhost:8000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

  };
  console.log(data)

  // console.log(handleLogout)


  //Search bar filter

  // const [posts, setPosts] = useState([]);
  // const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = 
      // await axios.get("/posts/profile/" )
      await axios.get("posts/timeline/" + user._id);
      setData(res.data)
    }; 
  
    // if (query.length === 0 || query.length > 2) fetchData()
    // fetchData();
   
    fetchData()
 
  }, [user._id]);

  // const search = ( data) => {
  //   return data.filter(item =>item.desc.toLowerCase().includes(query) )
    
  // }
 

  



  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="link">
          <span className="logo">Social Connect</span>
        </Link>
        {/* <div className='ReactSwitchBtn'>
        <label className='switch'>
            <input  type="checkbox"  />
              <span className='slider'></span>
        </label>

    </div> */}

        <div className="switchBtn">
          <span>
            <ReactSwitchBtn
              onChange={toggleTheme}
              checked={theme === "light"}
            />
          </span>
        </div>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          {data.filter(item =>item.desc.toLowerCase().includes(query))
          .map((item) => {
            
              <Post  key={item._id}/>
            
          })

          
          
          
          
          }

{/* {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))} */}



          {/* <Post data={search(post)}/> */}
       
          {/* {feed.filter((user) => {
            if(searchTerm == "") {
              return user
            }else {
              user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
            }


          })} */}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span> */}
          {user && (
            <span className="topbarLink" onClick={handleLogout}>
              LOGOUT
            </span>
          )}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="messenger">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {/* <img src="/assets/person/1.jpeg" alt="" className="topbarImg" /> */}
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
