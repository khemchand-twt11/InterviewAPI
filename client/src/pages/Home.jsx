import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const navigate = useNavigate();
  useEffect(() => {
    console.log(token);
    if (token) {
      return navigate("/dashboard", { replace: true });
    }
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 ">
      <div className="text-center">
        <h1 className="text-5xl mb-2">
          welcome to{" "}
          <b className="text-6xl" style={{ color: "#7B8FA1" }}>
            InterviewAI
          </b>
        </h1>
        <p>
          {" "}
          <i>
            Unlocking Your Potential : AI-Powered Interviews for Success
          </i>{" "}
        </p>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          <Link to="/login">Login</Link>
        </button>
        <button className="bg-teal-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/signup">Signup</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
