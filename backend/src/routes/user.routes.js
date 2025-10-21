// User API routes
import { Router } from "express";
import { userregistration , usersignin, logoutuser,refreshaccesstoekn}  from "../controllers/user.controller.js";
import { verify } from "../middlewares/auth.middleware.js";
import passport from "passport";
import { Apierror } from "../utils/Apierrors.js";
const router = Router();

router.route("/register").post(userregistration)
router.route("/signin").post(usersignin)


router.get("/me", verify, async (req, res) => {
  console.log("/users/me debug:");
  console.log("req.user:", req.user);
  console.log("req.session:", req.session);
  console.log("req.cookies:", req.cookies);
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ user: req.user });
});


router.route("/logout").post(verify,logoutuser)
router.route("/refrshed-token").post(refreshaccesstoekn)

export default router ;

