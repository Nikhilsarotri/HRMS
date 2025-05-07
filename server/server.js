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
  "http://localhost:5173",          // Local frontend (Vite)
  "https://yourfrontend.onrender.com"  // Optional: if deployed later
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