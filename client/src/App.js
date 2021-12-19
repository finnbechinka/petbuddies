import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
//import {AuthContext} from "./helpers/AuthContext";
import {useState, useEffect, createContext } from 'react';
import axios from "axios";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileOverview from './pages/ProfileOverview';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';

export const AuthContext = createContext();

function App() {
  const [authState, setAuthState] = useState({username: "", id: 0, status: false});

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
              <Link to="/"> Home</Link>
              {!authState.status && (
                <>
                  <Link to="/login"> Anmelden</Link>
                  <Link to="/register"> Registrieren</Link>
                </>
              )}
              {authState.status && (
                <>
                  <Link to="/myprofiles">Meine Profile</Link>
                  <Link to="/createprofile">Profil erstellen</Link>
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
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;