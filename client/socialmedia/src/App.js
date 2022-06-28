import {BrowserRouter as Router, Routes, Route, Link,useNavigate} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import TopBar from './components/TopBar';
import Settings from './components/Settings';
import Comments from './components/AddComment';
import Messenger from './pages/Messenger';
import News from './components/News';

import { AuthContext } from './context/AuthContext';
// import { UseGlobalContext } from './context/AuthContext';
import { useContext } from 'react';




function App() {
  const { user, theme} = useContext(AuthContext)

  
  return (
    <div className="App" id={theme}>
      <Router>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Register />} /> 
            <Route path="/login" element={user ? <Home /> : <Login /> } />
            <Route path="/messenger" element={user ? <Messenger /> : <Login /> } />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/settings/:username" element={<Settings />} />
            {/* <Route path="/comments" element={<Comments />} /> */}
            <Route path="/news" element={<News />} />
          </Routes>  
      </Router>
    </div>
  );
}

export default App;




























