import { Router } from "express";
import MemberLoginController from "../../controller/authMember/authMember.js";
import memberLoginValidator from "../../../validation/memberAuth/authMember.js";
const memberLoginRouter = Router();
memberLoginRouter.post(
  "/register",
  memberLoginValidator.register,
  MemberLoginController.register
);
memberLoginRouter.post("/login", MemberLoginController.login);
memberLoginRouter.get("/register", MemberLoginController.getall);
memberLoginRouter.get("/register/event", MemberLoginController.getMemberEvent);
memberLoginRouter.get("/register/:id/news", MemberLoginController.getoneMemberNews);
memberLoginRouter.get("/register/:id/news/comment", MemberLoginController.getoneMemberNewsComment);
memberLoginRouter.get("/register/:id/socialpost", MemberLoginController.getoneMemberSocialPost);
memberLoginRouter.get("/register/:id/socialpost/comment", MemberLoginController.getoneMembersocialPostComment);
memberLoginRouter.get("/register/:id", MemberLoginController.getone);
memberLoginRouter.get("/register/:id/event", MemberLoginController.getoneMemberEvent);
memberLoginRouter.put("/register/:id", MemberLoginController.update);
memberLoginRouter.delete("/register/:id", MemberLoginController.delete);
export default memberLoginRouter;
