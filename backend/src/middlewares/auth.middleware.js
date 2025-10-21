import { Apierror } from "../utils/Apierrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verify = asyncHandler(async(req, res, next) => {
  if (req.user) return next(); 

  
  try {
    const token = req.cookies?.accesstoken || req.header("authorization")?.replace("Bearer ", "");
    


    if (!token) {
      console.log("No token found, throwing 401 error.");
      throw new Apierror(401, "Unauthorized request");
      
    }

    const decoded = Jwt.verify(token, process.env.ACCESS_TOKENS_SECRET);
    const user = await User.findById(decoded?._id).select("-password -refreshtokens");
    
    if (!user) {
      console.log("Token was invalid or user not found, throwing 401 error.");
      throw new Apierror(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    
    console.error("Error inside verify middleware:", error.message);
    throw new Apierror(401, error.message || "Invalid Token");
  }
}); 

export { verify };