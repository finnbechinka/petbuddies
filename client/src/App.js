import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/"> Home</Link>
          <Link to="/login"> Login</Link>
          <Link to="/register"> Register</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;