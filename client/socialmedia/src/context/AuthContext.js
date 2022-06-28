import React, { useContext, useReducer, useEffect, useState, createContext } from "react";
import authReducer from "./AuthReducer";
import axios from "axios";
import AuthReducer from "./AuthReducer";
import ReactSwitchBtn from "../components/ReactSwitchBtn";

// const AppContext = React.createContext()

// const initialState= {
//     user : null,
//     // IsFetching: false,
//     // error:false,
// };


// const AppProvider = ({children}) => {
//     const [state, dispatch] = useReducer(authReducer, initialState);
//     const [user, setUser] = useState({})

//     // useEffect(() => {
//     //     localStorage.setItem("user", JSON.stringify(state.user))
//     // },[state.user])
    
//  const LoginCall = async (userCredential, dispatch) => {
//     // dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post("/auth/login", userCredential);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//     //   dispatch({ type: "LOGIN_FAILURE", payload: err });
//      console.log(err)
//     }
//   };
 
//     return(
//         <AppContext.Provider value={{
//             user: state.user,
//             // isFetching: state.isFetching,
//             // error: state.error, 
//             dispatch

//         }}> {children}

//         </AppContext.Provider>
//     )
// }

// export const UseGlobalContext = () => {
//     return useContext(AppContext)
// }

// export { AppContext, AppProvider }


const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  };
  
  
  export const AuthContext = createContext(INITIAL_STATE);
  
  export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    const [theme, setTheme]= useState("light");
    
    const toggleTheme = () => {
      setTheme((currentThem) => (currentThem === 'light' ? "dark" : "light"))
    }
    
    useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
    
    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
          theme, setTheme, toggleTheme,ReactSwitchBtn
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };