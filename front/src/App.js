import React, { useState, useEffect } from "react";
import HomePage from "./HomePage/HomePage.js";
// eslint-disable-next-line no-unused-vars
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // eslint-disable-next-line no-unused-vars
  NavLink,
  useHistory,
} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./loginAndLogOutPage/SignUp";
import SignIn from "./loginAndLogOutPage/Login";

function App() {
  // eslint-disable-next-line no-unused-vars
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("current-user");
    if (data) {
      setUserInfo(data);
    }
  }, []);
  // eslint-disable-next-line no-unused-vars
  let p = new Promise((resolve, reject) => {});

  return (
    <Router>
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/home" component={HomePage} />
        <Route path="/" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
