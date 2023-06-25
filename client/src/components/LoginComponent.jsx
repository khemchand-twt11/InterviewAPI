import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const url = "http://localhost:3000/login";

function LoginComponent({ userData, setUserData }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message?.includes("Password is incorrect")) {
          toast.error("Email or Passwords do not match!", { duration: 1500 });
        } else {
          toast.success("Login Successfully!", { duration: 1500 });
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));

          setTimeout(() => {
            navigation(`/dashboard`, { replace: true });
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred during login.");
      });
  };

  return (
    <section className="h-[95vh] w-full flex justify-center gap-x-8 pt-5 px-4 md:px-0">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full bg-white p-6 md:p-8 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-700 text-center">
            Welcome back
          </h1>
          <form className="mt-9">
            <div className="mb-3 relative">
              <input
                type="email"
                placeholder="Email"
                className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <IoEyeOffOutline
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handlePasswordToggle}
                  size={28}
                />
              ) : (
                <IoEyeOutline
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handlePasswordToggle}
                  size={28}
                />
              )}
            </div>
            <div className="mb-5 text-center">
              <a href="#" className="text-blue-500">
                Forgot password?
              </a>
            </div>

            <div className="mb-5">
              <button
                onClick={handleLogin}
                className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mb-9">
            <span>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </span>
          </div>
        </div>
        <div className="border-t border-gray-300 my-9"></div>
        <div className="flex items-center justify-center mb-6">
          <a
            href="#"
            className="w-full py-3 flex items-center justify-center text-white bg-blue-800 rounded-lg "
            style={{ background: "#4267b2" }}
          >
            <BsFacebook className="mr-3" />
            <span>Login with Facebook</span>
          </a>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="#"
            className="w-full py-3 flex items-center justify-center text-gray-700 border border-gray-300 rounded-lg"
          >
            <FcGoogle className="mr-3" />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default LoginComponent;
