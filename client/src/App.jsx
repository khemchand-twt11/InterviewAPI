import { BrowserRouter, Routes, Route } from "react-router-dom";
import "regenerator-runtime/runtime";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import Interview from "./pages/Interview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/interview/:section" element={<Interview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
