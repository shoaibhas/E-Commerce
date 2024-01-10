import { Router } from "express";
import socialActivityCommentController from "../../controller/socialActivity/socialActivityComment.js";
import socialCommentValidator from "../../../validation/socialActivity/socialActivityComment.js";
const socialActivityCommentRouter = Router();
socialActivityCommentRouter.post(
  "/create",
  socialCommentValidator.create,
  socialActivityCommentController.create
);
socialActivityCommentRouter.get("/create", socialActivityCommentController.getall);
socialActivityCommentRouter.get("/create/:id", socialActivityCommentController.getone);
// socialActivityCommentRouter.get("/create/comment", newsController.getallNewsComment);
socialActivityCommentRouter.put("/create/:id", socialActivityCommentController.update);
socialActivityCommentRouter.delete("/create/:id", socialActivityCommentController.delete);
export default socialActivityCommentRouter;
