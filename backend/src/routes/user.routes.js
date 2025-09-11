// User API routes
import { Router } from "express";
import { userregistration , usersignin}  from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(userregistration)
router.route("/signin").post(usersignin)

export default router ;
