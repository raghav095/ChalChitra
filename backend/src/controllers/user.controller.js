// Handles user request/response logic
import { User } from "../models/user.model.js"
import { Apierror } from "../utils/Apierrors.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Apiresponse } from "../utils/Apiresponse.js"


const generateAccessandRefreshToken = async (userId) => {
    try{
       const user =  await User.findById(userId)
      const accesstoken = user.generateAccessToken() 
       const refreshtoken = user.generateRefreshToken()
       user.refreshtokens = refreshtoken
       await user.save({ validateBeforeSave : false })

       return {refreshtoken , accesstoken}
    }
    catch (error){
            throw new Apierror(500, "something went wrong while generating refresh and acces tokens")
    }
}

const userregistration = asyncHandler(async (req, res) => {
        // getting the user details 
        // check if the user is already registered lr not 
        // create a user object in database - make an entry
        const {username,email, password } = req.body


        if ([username, email, password].some((field) => field?.trim() === "")) {
                throw new Apierror(400, "all fields are compulsory")
        }

        // checking if the user already exists with the same email or username
        const existeduser = await User.findOne({
                $or: [{ username }, { email }]
        })

        // we are checking if the user details when registering gets match with an existing user 
        if (existeduser) {
                throw new Apierror(409, "Email or Username already exists")
        }

        //     creating a new user in our database 
        const newuser = await User.create({ email, username, password });

        //     retriving the user data from the databse without any senisitive to use it 
        const newcreateduser = await User.findById(newuser._id).select("-password -refreshtokens")

        if (!newcreateduser) {
                throw new Apierror(500, "some thing went wrong ")
        }
   
        return res.status(201).json(
        new Apiresponse(200 , newcreateduser , "user registered succesfully")
    )









})

const usersignin  = asyncHandler(async(req , res) => {

        const {username , email , password} = req.body

        if(!username && !email){
                throw new Apierror(401,"username or email is required")

        }

        const user = await User.findOne({
                $or:[{username} , {email}]
        })

        if(!user){
                throw new Apierror(404 , "user does not exists")
        }

      const ispasswordvalid = await user.isPasswordCorrect(password)

        console.log("User found:", user);
        console.log("Password from request:", password);
        console.log("Password in DB:", user.password);
       if(!ispasswordvalid){
        throw new Apierror(401 , "invalid user credentials")
        }

        const{accesstoken , refreshtoken } = await generateAccessandRefreshToken(user._id);

        const logedinuser = await User.findById(user._id).select("-password -refreshtokens")

        const options = {
                httpOnly :true ,
                secure:true
        }

return res
.status(200)
.cookie("accesstoken", accesstoken , options)   
.cookie("refreshtoken" , refreshtoken, options) 
.json(
    new Apiresponse(
        200,
        {
            user:logedinuser ,accesstoken , refreshtoken

        },

        "userloged in succesfully"
    )
  )


})

const logoutuser = asyncHandler(async(req , res) => {
  await   User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshtokens : undefined
            }
        },
        {
            new : true,
        }
    )

      const options ={
    httpOnly : true ,
    secure : true
  } 

  return res
  .status(200)
  .clearCookie("accesstoken" ,options)
  .clearCookie("refreshtoken" ,options)
  .json(new Apiresponse(200,{},"user loggedout"))
})

const refreshaccesstoekn= asyncHandlers(async (req ,res ) => {
   const incomingrefreshaccesstoken= req.cookies.refreshtokens || req.body.refreshtokens

    if(incomingrefreshaccesstoken){
        throw new Apierror(401,"unauthorise request")
    }

try {
      const decodedrefreshtoken =   jwt.verify(incomingrefreshaccesstoken,process.env.REFRESH_TOKENS_SECRET)
    
      const user = await User.findById(decodedrefreshtoken?._id)
    
      if(!user){
            throw new Apierror(401,"invalid refresh token")
        }
    
        if(incomingrefreshaccesstoken !== user?.refreshtokens){
            throw new Apierror(401,"refresh token is used")
        }
    
        const options = {
            httpOnly:true,
            secure:true
        }
       const {accesstoken , newrefreshtoken}= await generateAccessandRefreshToken(user._id)
    
        return res 
        .status(200)
        .cookie("accesstoken" ,accesstoken , options)
        .cookie("refreshtoken" ,newrefreshtoken , options)
        .json(
            new Apiresponse(
               200 , 
               {accesstoken,refreshtoken:newrefreshtoken},
               "access token refreshed succesfully"
            )
        )
} catch (error) {
    throw new Apierror(401 , "invalid ")
}
})
export {userregistration , usersignin , logoutuser ,refreshaccesstoekn}