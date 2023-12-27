import { Router } from "express";
import adminLoginRouter from "./admin/index.js";
import orderRouter from "./order/index.js";
const allRouter = Router();
allRouter.use("/login", adminLoginRouter);
allRouter.use("/order", orderRouter);
export default allRouter;
