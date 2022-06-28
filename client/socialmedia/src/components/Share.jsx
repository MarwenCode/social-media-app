import {PermMedia, Label,Room, EmojiEmotions,Cancel} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Picker from 'emoji-picker-react';
import axios from "axios";
import Emoji from "./Emoji";


const Share = () => {
  const { user } = useContext(AuthContext);
  // const [chosenEmoji, setChosenEmoji] = useState(false);
  const PF = "http://localhost:8000/images/";
  const desc = useRef();
  const [file, setFile] = useState(null);


  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };


  // const onEmojiClick = () => {
  //   setChosenEmoji(true);
//   // };
//   const [chosenEmoji, setChosenEmoji] = useState(null);

//   const onEmojiClick = (event, emojiObject) => {
//    setChosenEmoji(emojiObject);
//  };

const [inputStr, setInputStr] = useState('');
const [showPicker, setShowPicker] = useState(false);

const onEmojiClick = (event, emojiObject) => {
  setInputStr(prevInput => prevInput + emojiObject.emoji);
  setShowPicker(false);
};

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {/* <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          /> */}
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
            value={inputStr}
            onChange={e => setInputStr(e.target.value)} 
            
           
           
          />
          {/* <span>{showPicker.emoji}</span> */}
          {/* <div className="Emoji">   {chosenEmoji ? (
        <span>{chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )} </div> */}
          <div className="Emoji">{showPicker && (
        <span>{showPicker.emoji}</span>
      ) 
      // : (
        
         
      //   <span>No emoji Chosen</span>
        
       
      // )
      } </div>
    
      
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div> */}
            <div className="shareOption">
              {/* {chosenEmoji &&   <Emoji />} */}

              <EmojiEmotions htmlColor="goldenrod" className="shareIcon"     onClick={() => setShowPicker(val => !val)} />
        {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} />}
              {/* <div className="picker"> <Picker onEmojiClick={onEmojiClick}/></div> */}
              
             
            
     
                 
            
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Share


   {/* {chosenEmoji && <Picker onEmojiClick={onEmojiClick} htmlColor="goldenrod" className="shareIcon" /> } */}
              {/* <Picker onEmojiClick={onEmojiClick} htmlColor="goldenrod" className="shareIcon" /> */}