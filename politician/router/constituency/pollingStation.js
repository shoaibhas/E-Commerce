import { Router } from "express";
import PollingStationController from "../../controller/constituency/pollingStation.js";
import pollingStationValidator from "../../../validation/constituency/pollingStation.js";
const pollingStationRouter = Router();
pollingStationRouter.post(
  "/create",
  pollingStationValidator.create,
  PollingStationController.create
);
pollingStationRouter.get("/create", PollingStationController.getall);
// pollingStationRouter.get("/create/:id", PollingStationController.get);
pollingStationRouter.put("/create/:id", PollingStationController.update);
pollingStationRouter.delete("/create/:id", PollingStationController.delete);

export default pollingStationRouter;
