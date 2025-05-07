import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db.js";
import userRoute from "./Routes/userRoute.js";
import candidateRoute from "./Routes/candidateRoutes.js";
import employeeRouter from "./Routes/employeeRoutes.js";
import leaveRouter from "./Routes/leaveRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://hrms-nikhil.netlify.app",
  "https://hrms-myla.onrender.com"  
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());


connectDb();


app.use("/user", userRoute);
app.use("/candidates", candidateRoute);
app.use("/employees", employeeRouter);
app.use("/leaves", leaveRouter);

// ✅ Start Server
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  console.log(`🚀 Server is running on Port: ${Port}`);
});
