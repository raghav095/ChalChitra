// Auth middleware
import { Apierror } from "../utils/Apierror.js";
import asyncHandler from "../utils/asyncHandlers.js";
import  Jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

 const verify = asyncHandler(async(req,res,next)=>{

  try {
    const token =  req.cookies?.accesstoken || req.header("authorization")?.replace("Bearer" , "")
  
    if(!token){
      throw new Apierror(401 ,"unauthorized request")
    }
  
     const decoded = Jwt.verify(token , process.env.ACCESS_TOKENS_SECRET)
  
     const user= await User.findById(decoded?._id).select("-password -refreshtokens")
     if(!user){
      throw new Apierror(401 , "invalid access token")
     }
     req.user = user;
     next()
  } catch (error) {
    throw new Apierror(401 , "invalid haaii")
  }
}) 

export {verify}