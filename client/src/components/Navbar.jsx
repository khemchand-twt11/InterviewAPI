import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <Link to="/">HOME</Link>
      <Link to="/login">LOGIN</Link>
      <Link to="/signup">SIGNUP</Link>
      <Link to="/dashboard">user dashboard</Link>
    </>
  );
}

export default Navbar;
