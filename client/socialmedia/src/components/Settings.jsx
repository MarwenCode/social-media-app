import React, {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Settings = () => {
    const { user, dispatch } = useContext(AuthContext)
    const PF = "http://localhost:8000/images/"
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    // const [from, setFrom] = useState("");
    // const [relationship, setRelationship] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: "UPDATE_START" });
      const updatedUser = {
        userId:user._id,
        username,
        email,
        password,
        city,
        // from,
        // relationship,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePicture = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {}
      }
      try {
        const res = await axios.put("/users/" + user._id, updatedUser);
        // const res = await axios.put("/users/" + {user:currentuser}, updatedUser);
        // const res = await axios.put(`/users?username=${username}`, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    };

    console.log(handleSubmit)
    return (
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <Link to="/">
            <span className="settingsDeleteTitle">Back to home page</span>
            </Link>
         
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
           
              <img
                src={file ? URL.createObjectURL(file) : PF+user.profilePicture}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>City</label>
            <input
              type="text"
              placeholder={user.city}
              onChange={(e) => setCity(e.target.value)}
            />
            {/* <label>From</label>
            <input
              type="text"
              placeholder={user.from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <label>Relationship</label>
            <input
              type="text"
              placeholder={user.relationship}
              onChange={(e) => setRelationship(e.target.value)}
            /> */}

            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <button className="settingsSubmit " type="submit">
              Update
            </button>
  
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}>
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
     
      </div>
    )
  }
  
  export default Settings
  
