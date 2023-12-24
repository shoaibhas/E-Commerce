import { Router } from "express";
import AdminLoginController from "../../controller/auth/admin.js";
import adminLoginValidator from "../../../validation/auth/index.js";
const adminLoginRouter = Router();
adminLoginRouter.post(
  "/register",
  adminLoginValidator.register,
  AdminLoginController.register
);
adminLoginRouter.post("/login", AdminLoginController.login);
adminLoginRouter.get("/register", AdminLoginController.getall);
adminLoginRouter.get("/register/:id", AdminLoginController.getone);
adminLoginRouter.put("/register/:id", AdminLoginController.update);
adminLoginRouter.delete("/register/:id", AdminLoginController.delete);
export default adminLoginRouter;
