// User API routes
import { Router } from "express";
import { userregistration , usersignin, logoutuser,refreshaccesstoekn}  from "../controllers/user.controller.js";
import { verify } from "../middlewares/auth.middleware.js";
import passport from "passport";
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
    res.redirect("https://chalchitra.live");
  }
);

router.route("/logout").post(verify,logoutuser)
router.route("/refrshed-token").post(refreshaccesstoekn)

export default router ;
