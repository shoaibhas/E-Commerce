import { Router } from "express";
import newsCommentController from "../../controller/news/newsComment.js";
import newsCommentValidator from "../../../validation/news/newsComment.js";
const newsCommentRouter = Router();
newsCommentRouter.post(
  "/create",
  newsCommentValidator.create,
  newsCommentController.create
);
newsCommentRouter.get("/create", newsCommentController.getall);
newsCommentRouter.get("/create/:id", newsCommentController.getone);
newsCommentRouter.put("/create/:id", newsCommentController.update);
newsCommentRouter.delete("/create/:id", newsCommentController.delete);
export default newsCommentRouter;
