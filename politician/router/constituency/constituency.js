import { Router } from "express";
import ConstituencyController from "../../controller/constituency/constituency.js";
import constituencyValidator from "../../../validation/constituency/constituency.js";
const constituencyRouter = Router();
constituencyRouter.post(
  "/create",
  constituencyValidator.create,
  ConstituencyController.create
);
constituencyRouter.get("/create", ConstituencyController.getall);
constituencyRouter.get("/creates", ConstituencyController.get);
constituencyRouter.put("/create/:id", ConstituencyController.update);
constituencyRouter.delete("/create/:id", ConstituencyController.delete);
export default constituencyRouter;
