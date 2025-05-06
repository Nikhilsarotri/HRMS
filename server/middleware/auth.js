import JWT from "jsonwebtoken";
import userModel from "../Model/userModel.js";
 const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "please login" });
    }
    const decodedata =  JWT.verify(token,process.env.JWT_SECRET_KEY);

          
    const {userid} = decodedata;
    // console.log(userid,".>>>>>>>>>>")

    const user = await userModel.findById(userid);
    if (!user) {
      return res.status(400).json({ message: "no user found" });
    }

    req.user = user
    next();
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message });
  }
};
export default userAuth;