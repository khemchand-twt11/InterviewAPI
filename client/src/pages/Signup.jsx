import { useState } from "react";
import SignupComponent from "../components/SignupComponent";
const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  return <SignupComponent userData={userData} setUserData={setUserData} />;
};

export default Signup;
