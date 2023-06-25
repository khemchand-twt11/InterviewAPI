import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      {/* <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-cyan-700"></div>
        <nav className="flex justify-between items-center py-4 px-6 relative z-10">
          <Link to="/" className="text-white font-bold text-xl font-sans">
            HOME
          </Link>
          <div className="space-x-4">
            <Link to="/dashboard" className="text-white font-mono">
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-white font-sans transition-all duration-300 hover:text-orange-300 hover:scale-110"
            >
              LOGIN
            </Link>
            <Link
              to="/signup"
              className="text-white font-sans transition-all duration-300 hover:text-orange-300 hover:scale-110"
            >
              SIGNUP
            </Link>
          </div>
        </nav>
      </div> */}
    </>
  );
}

export default Navbar;
