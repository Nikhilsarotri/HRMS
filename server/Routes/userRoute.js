import express from "express"
import { Createuser } from "../Controller/userController.js";
import { userlogin } from "../Controller/userController.js";
import userAuth from "../middleware/auth.js";
import { logoutuser } from "../Controller/userController.js";
const router = express.Router();
router.post("/",Createuser)
router.post("/login",userlogin)
router.post("/logout",userAuth,logoutuser)
export default router;