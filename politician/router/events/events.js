import { Router } from "express";
import eventController from "../../controller/events/events.js";
import eventValidator from "../../../validation/events/events.js";
const eventRouter = Router();
eventRouter.post(
  "/create",
  eventValidator.create,
  eventController.create
);
eventRouter.get("/create", eventController.getall);
// eventRouter.get("/creates", eventController.get);
eventRouter.put("/create/:id", eventController.update);
eventRouter.delete("/create/:id", eventController.delete);
export default eventRouter;
