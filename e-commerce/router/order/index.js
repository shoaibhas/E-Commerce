import { Router } from "express";
import orderController from "../../controller/order/order.js";
const orderRouter = Router();
orderRouter.post("/create", orderController.create);
orderRouter.get("/get", orderController.get);
orderRouter.delete("/get/:id", orderController.delete);
export default orderRouter;
