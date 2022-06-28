import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
  } from "@material-ui/icons";
import { useState, useEffect } from "react";
  import { Users } from "../DataUsers"
import CloseFriend from "./CloseFriend";
import News from "./News";
import axios from 'axios';
import { Link } from "react-router-dom";


const SideBar = () => {

  // const [listData, setListData] = useState([]);
  const [listData, setListData] = useState([])

  const url='https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8e331b907e5c48dba9b48ea87cfdadc3'

  useEffect(() => {
     axios.get(`
    https://newsapi.org/v2/everything?q=tesla&from=2022-05-19&sortBy=publishedAt&apiKey=8e331b907e5c48dba9b48ea87cfdadc3`)
    .then((res) => setListData((listData) => [...listData, res.data]))
    console.log(listData)
  }, [])

  // useEffect(() => {
  //   axios.get(url)
  //   .then(response => {
  //       setListData(response.data)
  //   })
  // }, [url]);


  // useEffect(() => {
  //   axios.get(url)
  //   .then((res) => setListData((listData) => [...listData, res.data]))
  //   console.log(listData)
  // }, []);

  // useEffect(() => {
  //   axios.get(url)
  //   .then((res) => setListData((listData) => [...listData, res.data]))
  //   console.log(listData)
  // }, []);



  







  return (
    <div className="sidebar">
    <div className="sidebarWrapper">
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <Link to="/" className="link"> 
          <RssFeed className="sidebarIcon" />
          <span className="sidebarListItemText">Feed</span>
          </Link>
       
        </li>
        <li className="sidebarListItem">
          <Chat className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
        </li>
        <li className="sidebarListItem">
          <PlayCircleFilledOutlined className="sidebarIcon" />
          <span className="sidebarListItemText">Videos</span>
        </li>
        <li className="sidebarListItem">
          <Group className="sidebarIcon" />
          <span className="sidebarListItemText">Groups</span>
        </li>
   
      </ul>
      {/* <button className="sidebarButton">Show More</button> */}
      <hr className="sidebarHr" />
      {/* <ul className="sidebarFriendList">
        {Users.map((u) => (
          <CloseFriend key={u.id} user={u} />
        ))}
      </ul> */}
      <div>
        {/* <h1>Title</h1>
        <p>hehehehehehehe heheheheheheh hehehe</p>
        <h1>Title</h1>
        <p>hehehehehehehe heheheheheheh hehehe</p>
        <h1>Title</h1>
        <p>hehehehehehehe heheheheheheh hehehe</p>
        <h1>Title</h1>
        <p>hehehehehehehe heheheheheheh hehehe</p> */}
        {listData.map((news, index)=> (

          <News news={news} key={index}/>
          // <News news={news} key={news.id}/>


        ))}
        
       
      </div>
    </div>
  </div>
  )
}

export default SideBar