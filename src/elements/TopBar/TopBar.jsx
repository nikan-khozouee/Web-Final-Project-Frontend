import React from "react";
import { Link } from "react-router-dom";

const topBarStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#333",
  color: "blue",
  textAlign: "center",
  position: "fixed",
  top: 0,
  left: 0,
};

const logout = () => {
  localStorage.setItem("userAuth", null);
};

const logoutLinkStyle = {
  padding: "5px 10px",
  margin: "0 20px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const TopBar = () => {
  return (
    <div style={topBarStyle}>
      <h1>Games DB</h1>
      <Link style={logoutLinkStyle} to="/">
        Home
      </Link>
      <Link style={logoutLinkStyle} onClick={logout} to="/login">
        Logout
      </Link>{" "}
      <Link style={logoutLinkStyle} to="/search">
        Search
      </Link>
    </div>
  );
};

export default TopBar;
