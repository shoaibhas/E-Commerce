import { Router } from "express";
import socialActivityController from "../../controller/socialActivity/socialActivity.js";
import socialActivityValidator from "../../../validation/socialActivity/socialActivity.js";
const socialActivityRouter = Router();
socialActivityRouter.post(
  "/create",
  socialActivityValidator.create,
  socialActivityController.create
);
socialActivityRouter.get("/create", socialActivityController.getall);
socialActivityRouter.get("/create/:id", socialActivityController.getone);
// socialActivityRouter.get("/create/comment", newsController.getallNewsComment);
socialActivityRouter.get("/create/:id/comment", socialActivityController.getoneSocialComment);
socialActivityRouter.put("/create/:id", socialActivityController.update);
socialActivityRouter.put("/create/:id/like", socialActivityController.updateTotalLike);
socialActivityRouter.delete("/create/:id", socialActivityController.delete);
export default socialActivityRouter;
