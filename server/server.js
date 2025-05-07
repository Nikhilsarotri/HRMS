import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
 import connectDb from "./db.js";
 import  userRoute from "./Routes/userRoute.js"
import cookieParser from "cookie-parser";
import candidateRoute from "./Routes/candidateRoutes.js"
import employeeRouter from "./Routes/employeeRoutes.js"
import leaveRouter from "./Routes/leaveRoutes.js"

dotenv.config()

 const app=express();
 const allowedOrigins = [
  "http://localhost:5173",
  "https://hrms-nikhil.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


res.cookie('token', token, {
  httpOnly: true,        // Ensures the cookie is only accessible via HTTP(S)
  secure: process.env.NODE_ENV === 'production', // Only use Secure cookies in production
  sameSite: 'None',      // Allow the cookie to be sent cross-origin (if needed)
  maxAge: 3600000,       // 1 hour expiration (adjust as needed)
});
  connectDb();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/user',userRoute)


  app.use('/candidates', candidateRoute);
  app.use('/employees', employeeRouter);
  app.use('/leaves', leaveRouter);
   const Port=process.env.PORT
   app .listen(Port,()=>{
    console.log(`Server is running on Port,:${Port}`)
   })