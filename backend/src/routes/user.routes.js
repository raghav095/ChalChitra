// User API routes
import { Router } from "express";
import { userregistration} from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(userregistration)

export default router ;
