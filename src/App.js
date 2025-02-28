import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Signuppage } from "./Auth/Signup"
import  Login  from "./Auth/Login";
import NoteState from "./context/notes/NoteState";
import { Admin } from "./components/admin";
import AllUsers from "./components/AllUsers";
import Myteam from "./components/Myteam";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';//toast ka css



function App() {
  return (
    <>
      <NoteState>
        <Router>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>   {/* home is contacts on nav bar */}
            <Route path="/allusers" element={<AllUsers />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signuppage />}></Route>
            <Route path="/myteam" element={<Myteam />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
