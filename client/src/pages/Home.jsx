import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        <Link to="/login">Login</Link>
      </button>
      <button className="bg-teal-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/signup">Signup</Link>
      </button>
    </div>
  );
}

export default Home;
