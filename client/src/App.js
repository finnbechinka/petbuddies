import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
//import {AuthContext} from "./helpers/AuthContext";
import {useState, useEffect, createContext } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileOverview from './pages/ProfileOverview';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';
import MyList from './pages/MyList';
import Message from './pages/Message';
import Chats from './pages/Chats';

export const AuthContext = createContext();

function App() {
  const [authState, setAuthState] = useState({username: "", id: 0, status: false});
  let redirected = false;

  useEffect(() =>{
    axios.get("http://localhost:3001/auth/auth", {headers: {accessToken: localStorage.getItem("accessToken"),},}).then((response) =>{
      if(response.data.error){
        setAuthState({...authState, status: false});
      }else{
        setAuthState({username: response.data.username, id: response.data.id, status: true});
      }
    })
  }, []);

  const logout = () =>{
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
    window.location.href='/';
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            <div className="links">
              
              {!authState.status && (
                <>
                  <Link to="/login"> Anmelden</Link>
                  <Link to="/register"> Registrieren</Link>
                </>
              )}
              {authState.status && (
                <>
                  <Link to="/"> Home</Link>
                  <Link to="/myprofiles">Meine Profile</Link>
                  <Link to="/buddielist">Meine Liste</Link>
                  <Link to="/createprofile">Profil erstellen</Link>
                  <Link to="/chats">Chats</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              {authState.status && (
                <>
                  <h1>Hallo, {authState.username}! </h1>
                  <button onClick={logout}> Abmelden</button>
                </>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/myprofiles" element={<ProfileOverview/>}/>
            <Route path="/createprofile" element={<CreateProfile/>}/>
            <Route path="/profile/:id/edit" element={<EditProfile/>}/>
            <Route path="/buddielist" element={<MyList/>}/>
            <Route path="/message/:id" element={<Message/>}/>
            <Route path="/chats" element={<Chats/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;