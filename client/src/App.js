import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {AuthContext} from "./helpers/AuthContext";
import {useState, useEffect} from 'react'
import axios from "axios";

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
                  <Link to="/login"> Login</Link>
                  <Link to="/register"> Register</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              {authState.status && (
                <>
                  <h1>hey, {authState.username}! </h1>
                  <button onClick={logout}> Logout</button>
                </>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;