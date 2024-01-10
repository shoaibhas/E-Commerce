import { Router } from "express";
// import adminLoginValidator from "../../../validation/adminAuth/authAdmin.js";
import AdminLoginController from "../../controller/authAdmin/authAdmin.js";
import upload from "../../cloudinary/cloudinary.js";
// import upload from "../../cloudinary/cloudinary.js";
const adminLoginRouter = Router();
adminLoginRouter.post(
  "/register",
  upload.single("images"),
  AdminLoginController.register
);

adminLoginRouter.post("/login", AdminLoginController.login);
adminLoginRouter.get("/register", AdminLoginController.getall);
adminLoginRouter.get("/register/event", AdminLoginController.getAdminEvents);
adminLoginRouter.get("/register/news", AdminLoginController.getAdminNews);
adminLoginRouter.get(
  "/register/news/comment",
  AdminLoginController.getAdminNewsComment
);
adminLoginRouter.get(
  "/register/socialactivity/comment",
  AdminLoginController.getAdminSocialComment
);
adminLoginRouter.get(
  "/register/socialactivity",
  AdminLoginController.getAdminSocialPost
);
adminLoginRouter.get("/register/:id", AdminLoginController.getone);
adminLoginRouter.put("/register/:id", AdminLoginController.update);
adminLoginRouter.delete("/register/:id", AdminLoginController.delete);
export default adminLoginRouter;
