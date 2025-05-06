import React, { useState } from "react";
import img from "../assets/login.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Base_Url } from "../../../server/constants";

const schema = z
  .object({
    name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirm_password: z.string(4,"Please confirm your password"),
  })

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
    const response=  await axios.post(`${Base_Url}/user/`, {
        name: data.name,
        email: data.email,
        password: data.password,
        confirm_password:data.confirm_password
      });
      console.log(response,"here is")
      navigate("/login");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="flex items-center w-full justify-center text-[#6a1b9a] mt-5">
        <span className="text-4xl font-bold">LOGO</span>
      </div>

      <div className="flex mt-7 px-5 rounded-lg w-full">
        <div className="w-[50%] h-screen rounded-l-lg bg-[#4D007D] shadow-sm">
          <div className="m-10">
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
              minim veniam...
            </p>
          </div>
        </div>

        <div className="w-[50%] h-screen flex justify-center rounded-r-lg shadow-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 flex flex-col gap-3"
          >
            <h2 className="text-2xl">Welcome to Dashboard</h2>

            <label>
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              className="border h-14 p-4 rounded-lg w-[375px]"
              type="text"
              placeholder=" Full Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}

            <label>
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              className="border h-14 p-4 rounded-lg w-[375px]"
              type="email"
              placeholder=" Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <label>
              Password<span className="text-red-500">*</span>
            </label>
            <div className="w-[375px] relative">
              <input
                className="border h-14 p-4 rounded-lg w-[375px]"
                type={showPassword ? "text" : "password"}
                placeholder=" Password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaRegEyeSlash className="text-[#4D007D]" />
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}

            <label>
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <div className="w-[375px] relative">
              <input
                className="border h-14 p-4 rounded-lg w-[375px]"
                type={showconfirmPassword ? "text" : "password"}
                placeholder=" Confirm Password"
                {...register("confirm_password")}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                onClick={() => setShowConfirmPassword(!showconfirmPassword)}
              >
                <FaRegEyeSlash className="text-[#4D007D]" />
              </button>
            </div>
            {errors.confirm_password && (
              <p className="text-sm text-red-500">
                {errors.confirm_password.message}
              </p>
            )}

            {serverError && (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-40 h-10 rounded-full bg-[#A4A4A4] text-white hover:bg-[#4D007D]"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <label className="text-sm text-[#A4A4A4]">
              Already have an account?
              <Link to="/login" className="text-[#4D007D] cursor-pointer">
                {" "}
                Login
              </Link>
            </label>
          </form>
        </div>
      </div>
    </>
  );
};
