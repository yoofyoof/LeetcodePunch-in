import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function Navbar(props) {
  return (
    <nav class="navbar navbar-expand-lg  home-nav">
      <p className="appname">Leetcode Punch-in</p>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="home-nav-link">
          <li className="nav-item">
            <Link to="/">
              <button className="homeLogOut" onClick={props.logoutFunction}>
                Log Out
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logoutFunction: PropTypes.func.isRequired,
};
export default Navbar;
