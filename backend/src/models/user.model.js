import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true

    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    refreshtokens:{
      type:String
    }

  }, { timestamps: true }
)


// chechking of the password is changed or not before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname

    },

        process.env.ACCESS_TOKENS_SECRET,
        { expiresIn: process.env.ACCESS_TOKENS_EXPIRY }

    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,


    },

        process.env.REFRESH_TOKENS_SECRET,
        { expiresIn: process.env.REFRESH_TOKENS_EXPIRY }

    )
}

export const User = mongoose.model("User", userSchema)