// User API routes
import { Router } from "express";
import { userregistration , usersignin, logoutuser,refreshaccesstoekn}  from "../controllers/user.controller.js";
import { verify } from "../middlewares/auth.middleware.js";
import passport from "passport";
import { Apierror } from "../utils/Apierrors.js";
const router = Router();

router.route("/register").post(userregistration)
router.route("/signin").post(usersignin)
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect to your frontend after successful login
    res.redirect(`${process.env.FRONTEND_URL}/mainpage`);
  }
);

router.get("/me" , verify,async(req,res)=>{
    try {
     if (!req.user) {
      throw new Apierror(401 , "Not Authenticated")
    }
    res.json({ user: req.user });
        
    } catch (error) {
       throw new Apierror(500 , "server error ")
    }
})
router.route("/logout").post(verify,logoutuser)
router.route("/refrshed-token").post(refreshaccesstoekn)

export default router ;
