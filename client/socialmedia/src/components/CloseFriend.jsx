import React from 'react'

const CloseFriend = ({user}) => {
  const PF = "http://localhost:8000/images/"
  
    return (
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    );

}

export default CloseFriend