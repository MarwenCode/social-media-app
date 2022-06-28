import React, { useRef } from 'react';
import { UseGlobalContext } from '../context/AuthContext';
import { LoginCall } from '../apiCalls';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  // const {user, dispatch,  } = UseGlobalContext()
  const {user, isFetching, dispatch } = useContext(AuthContext);


  const email = useRef();
  const password = useRef();



  // const Navigate = useNavigate()

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //     const user = {
  //       email: email.current.value,
  //       password: password.current.value,
  //     };
  //     try {
  //       await axios.post("/auth/login", user);
  //      Navigate("/");
  //     } catch (err) {
  //       console.log(err);
  //     }
    
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   dispatch({type:" LOGIN_START"})
  //   try {
  //     const res = await axios.post("/auth/login", {
  //       emailRef : emailRef.current.value,
  //       passwordRef: passwordRef.current.value,
  
  //     })

  //     dispatch({type:"LOGIN_SUCCESS", payload: res.data})
      
  //   } catch (error) {
  //     dispatch({type: "LOGIN_FAILURE"})
      
  //   }
 
  //   // console.log(e.target.value)
  // }


  const handleClick= (e) => {
    e.preventDefault()
    LoginCall({email: email.current.value, password: password.current.value}, dispatch)
 
    
  }
  console.log(user)
 
  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">Social Connect</h3>
        <span className="loginDesc">
          Connect with friends and the world around you on Lamasocial.
        </span>
      </div>
      <div className="loginRight" >
        <form className="loginBox"  onSubmit={handleClick}>
          <input placeholder="Email" type="email" className="loginInput" required  ref={email}/>
          <input placeholder="Password" type="password" className="loginInput" required ref={password}  />
          <button className="loginButton"  type="submit" >Log in</button>
          <span className="loginForgot">Forgot Password?</span>
          <button className="loginRegisterButton">
            Create a New Account
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login;

// {isFetching ? "Loading" : "Log In"}

