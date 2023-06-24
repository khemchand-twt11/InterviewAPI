// import React from "react";
// import LoginComponent from "../components/LoginComponent";
// const Login = () => {
//   return <LoginComponent />;
// };

// export default Login;

import React, { useState } from "react";
import LoginComponent from "../components/LoginComponent";
// import SuccessToast from "../components/toast/SuccessToast";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  return (
    <div>
      <LoginComponent userData={userData} setUserData={setUserData} />
      {/* <SuccessToast message={"Registered successfully!"} /> */}
    </div>
  );
};

export default Login;
