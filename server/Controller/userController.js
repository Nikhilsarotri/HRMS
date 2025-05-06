import userModel from "../Model/userModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";

import path from "path";

export const Createuser = async (req, res) => {
  console.log("running")
    try {
      const { name, email, password,confirm_password } = req.body;
      if (!name || !email || !password||!confirm_password) {
        return res.status(404).json({ message: "invalid payload" });
      }
      const existingagent = await userModel.findOne({ email });
      if (existingagent) {
        console.log("email", email);
        return res.status(400).json({ message: "email already exist" });
      }
      if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const hashedpassword=  await bcrypt.hash(password,10)
   
      let user = await userModel.create({
        name,
        email,
        password:hashedpassword,
      
      });
  
      return res.status(201).json({ message: "user creatd succesfully", user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };







  export const userlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(404)
          .json({ message: "email or password  are required" });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "invalid email or password" });
      }
  
      const userMatch = await bcrypt.compare(password, user.password);
      if (!userMatch) {
        return res.status(404).json({ message: "invalid email or password" });
      }
  
      const token = JWT.sign(
        { userid: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      console.log(token);
      const updateuser = await userModel.findByIdAndUpdate(
        user._id,
        { $set: { token: token } },
        { new: true }
      );
  
      res.cookie("token", token);
      return res.status(200).json({
        message: "Login successful",
        user: updateuser,
        token})
      //   token,
      //   name: user.name,
      //   userid: user._id,
      // });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  };


  export const logoutuser = async (req, res, next) => {
    try {
      res.clearCookie("token", "", {
        expiresIn: new Date(Date.now()),
      });
      return res.status(200).json({ message: "Logout sucessfully" });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  };