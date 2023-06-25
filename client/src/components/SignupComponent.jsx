import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// const url = "https://pear-splendid-bee.cyclic.app/users/register";
const url = "https://worried-boa-capris.cyclic.app/register";
function SignupComponent({ userData, setUserData }) {
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [ifUserExists, setIfUserExists] = useState(false);
  const navigate = useNavigate();
  const handlePasswordToggleOne = () => {
    setShowPasswordOne(!showPasswordOne);
  };

  const handlePasswordToggleTwo = () => {
    setShowPasswordTwo(!showPasswordTwo);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setPasswordMismatch(false);

    if (userData.password !== userData.confirmPassword) {
      setPasswordMismatch(true);
      toast.error("Passwords do not match!", { duration: 1500 });
    } else {
      const { confirmPassword, ...actualData } = userData;
      fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actualData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message.includes("User registered successfully")) {
            toast.success("Registration successful!");
            setTimeout(() => {
              navigate(`/login`, { replace: true });
            }, 1500);
          } else if (data.message.includes("Email already exists")) {
            setIfUserExists(true);
            toast.error("Email already registered!", { duration: 1500 });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred during registration.");
        });
    }
  };

  return (
    <section className="container mx-auto py-5 px-6 flex justify-center gap-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md form w-full  rounded-lg px-6 py-8">
        <div className="form-content">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Create an Account
          </h1>
          <form className="mt-9 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                className="w-full h-11 border-2 border-gray-300 rounded px-4 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="w-full h-11 border-2 border-gray-300 rounded px-4 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <input
                type={showPasswordOne ? "text" : "password"}
                placeholder="Create password"
                name="password"
                onChange={handleChange}
                className="w-full h-11 border-2 border-gray-300 rounded px-4 focus:outline-none focus:border-indigo-500"
              />
              {showPasswordOne ? (
                <IoEyeOffOutline
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handlePasswordToggleOne}
                  size={28}
                />
              ) : (
                <IoEyeOutline
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handlePasswordToggleOne}
                  size={28}
                />
              )}
            </div>
            <div className="relative">
              <input
                type={showPasswordTwo ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={handleChange}
                className="w-full h-11 border-2 border-gray-300 rounded px-4 focus:outline-none focus:border-indigo-500"
              />
              {showPasswordTwo ? (
                <IoEyeOffOutline
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handlePasswordToggleTwo}
                  size={28}
                />
              ) : (
                <IoEyeOutline
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handlePasswordToggleTwo}
                  size={28}
                />
              )}
            </div>
            <div>
              <button
                onClick={handleSignup}
                className="w-full h-11 text-white bg-teal-500 rounded transition duration-200 hover:bg-teal-600 cursor-pointer"
              >
                Signup
              </button>
            </div>
          </form>

          <div className="divider text-center my-6 relative">
            <div className="border-b border-gray-300 ">
              <span className="divider-text bg-white px-2 text-gray-600 absolute transform -translate-x-1/2">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="social py-3 w-full flex flex-col gap-4">
            <button
              className="flex w-full items-center h-11 justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              style={{ background: "#4267b2" }}
            >
              <BsFacebook className="mr-2" /> Facebook
            </button>
            <button className="flex w-full h-11 items-center justify-center bg-white border text-gray-700 rounded hover:bg-gray-100 transition duration-200">
              <FcGoogle className="mr-2" /> Google
            </button>
          </div>
        </div>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
export default SignupComponent;
