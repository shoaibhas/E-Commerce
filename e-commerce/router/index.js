import { Router } from "express";
import adminLoginRouter from "./admin/index.js";
const allRouter = Router();
allRouter.use("/login", adminLoginRouter);
export default allRouter;
