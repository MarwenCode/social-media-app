import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const Navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
       Navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Connect</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social Connect.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" className="loginInput" ref={username}/>
            <input placeholder="Email" className="loginInput"  ref={email} />
            <input placeholder="Password" className="loginInput" type="password"  ref={password}/>
            <input placeholder="Confirm Password " className="loginInput" type="password"  ref={passwordAgain}/>
            <button className="loginButton" tyê="submit">Sign Up</button>
            <Link  to="/login">
            <button className="loginRegisterButton">Log into Account</button>
            </Link>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register