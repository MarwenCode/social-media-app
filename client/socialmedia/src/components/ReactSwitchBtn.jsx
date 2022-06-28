import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const ReactSwitchBtn = () => { 
  const { toggleTheme }= useContext(AuthContext)
    // const [theme, setTheme]= useState("dark");
    
    // const toggleTheme = () => {
    //   setTheme((currentThem) => (currentThem === 'light' ? "dark" : "light"))
    // }
   
  
  return (
    <div className='ReactSwitchBtn'>
        <label className='switch'>
            <input  type="checkbox" onChange={toggleTheme} />
              <span className='slider'></span>
        </label>

    </div>
  )
}

export default ReactSwitchBtn