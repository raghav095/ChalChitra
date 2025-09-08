// Handles user request/response logic
import { User } from "../models/user.model.js"
import { Apierror } from "../utils/Apierrors.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Apiresponse } from "../utils/Apiresponse.js"
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
        const newcreateduser = await User.findById(newuser._id).select("-password")

        if (!newcreateduser) {
                throw new Apierror(500, "some thing went wrong ")
        }
   
        return res.status(201).json(
        new Apiresponse(200 , newcreateduser , "user registered succesfully")
    )


})

export {userregistration}