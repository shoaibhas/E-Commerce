import { Router } from "express";
import newsController from "../../controller/news/news.js";
import newsValidator from "../../../validation/news/news.js";
const newsRouter = Router();
newsRouter.post(
  "/create",
  newsValidator.create,
  newsController.create
);
newsRouter.get("/create", newsController.getall);
newsRouter.get("/create/:id", newsController.getone);
// newsRouter.get("/create/comment", newsController.getallNewsComment);
newsRouter.get("/create/:id/comment", newsController.getoneNewsComment);
newsRouter.put("/create/:id", newsController.update);
newsRouter.put("/create/:id/like", newsController.updateTotalLike);
newsRouter.delete("/create/:id", newsController.delete);
export default newsRouter;
