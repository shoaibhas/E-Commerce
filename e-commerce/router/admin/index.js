import { Router } from "express";
import AdminLoginController from "../../controller/auth/admin.js";
const adminLoginRouter = Router();
adminLoginRouter.post("/register", AdminLoginController.register);
adminLoginRouter.post("/login", AdminLoginController.login);
export default adminLoginRouter;
