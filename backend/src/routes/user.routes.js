// User API routes
import { Router } from "express";
import { userregistration , usersignin, logoutuser,refreshaccesstoekn}  from "../controllers/user.controller.js";
import { verify } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(userregistration)
router.route("/signin").post(usersignin)

router.route("/logout").post(verify,logoutuser)
router.route("/refrshed-token").post(refreshaccesstoekn)

export default router ;
