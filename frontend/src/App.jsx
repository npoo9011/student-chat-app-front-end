import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import ViewProfile from "./Pages/ViewProfile/ViewProfile";
import userHome from "./Pages/UserHome/HomeUser/userHome";
import FindUser from "./Pages/UserHome/FindUser/FindUser";
import FrientRequest from "./Pages/UserHome/FriendRequest/FrientRequest";
import Contact from "./Pages/FooterPages/Contact/Contact";
import About from "./Pages/FooterPages/About/About";
import Chat from "./Pages/UserHome/Chat/Chat";
function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Login" component={Login} />
        <Route path="/viewprofile" component={ViewProfile} />
        <Route path="/userHome" component={userHome} />
        <Route path="/FindUser" component={FindUser} />
        <Route path="/FrientRequest" component={FrientRequest} />
        <Route path="/Contact" component={Contact} />
        <Route path="/About" component={About} />

        <Route path="/Chat" component={Chat} />
      </div>
    </Router>
  );
}
export default App;
