import React from "react";
import img from "../assets/login.png";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Base_Url } from "../../../server/constants";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("1234");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${Base_Url}/user/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("isLoggedIn", "true"); // Save login state
      navigate('/candidates'); // Redirect to candidates page
    
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center w-full justify-center text-[#6a1b9a]  mt-5">
        <span className="text-4xl font-bold">LOGO</span>
      </div>

      <div className=" flex mt-7  px-5  rounded-lg w-full">
        <div className="w-[50%] h-full rounded-l-lg bg-[#4D007D] shadow-sm">
          <div className="m-10">
            {" "}
            <img
              src={img}
              alt="Dashboard Preview"
              className="h-auto object-cover"
            />
          </div>
          <div className="m-10">
            <h3 className="text-base m-2 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </h3>
            <p className="text-sm m-2 text-white">
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="w-[50%] h-screen flex justify-center  rounded-r-lg shadow-sm">
          <div className="mt-10">
            <h2 className="text-2xl">Welcome to Dashboard</h2>
            <div className="mt-5 flex flex-col gap-3">
              <label>
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                className="border h-14 p-4 rounded-lg w-[375px]"
                type="email"
                placeholder=" Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>
                Password<span className="text-red-500">*</span>
              </label>
              <div className="w-[375px] relative">
                <input
                  className="border h-14 p-4 rounded-lg w-[375px]"
                  type={showPassword ? "text" : "password"}
                  placeholder=" Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />{" "}
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FaRegEyeSlash className="text-[#4D007D]" />
                </button>
              </div>
              {error && (
            <div className=" flex alert alert-error mt-4 bg-red-50 border border-red-200 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
              <label
                className="text-sm text-[#A4A4A4]
"
              >
                Forgot password?
              </label>

              <button
                className="w-40 h-10 rounded-full bg-[#A4A4A4] text-white hover:bg-[#4D007D]
]; 
"
               onClick={handleLogin}
               disabled={isLoading}>

{isLoading ? 'Logging in...' : 'Login'}
              </button>
              <label
                className="text-sm text-[#A4A4A4]
"
              >
                Don't have an account?
                <Link to="/register" className="text-[#4D007D] cursor-pointer">
                  Register
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
