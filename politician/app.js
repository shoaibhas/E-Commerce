import "dotenv/config.js";
import express from "express";
import sequelizes, { connectDB } from "./db/config.js";
import initDB from "./db/init.js";
import Session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import allRouter from "./router/index.js";
// import multer from "multer";

import cors from "cors";
const port = process.env.port;
const envData = process.env;
const app = express();
// app.use(cors())
const corsInstance = new cors({
  origin: ["http://localhost:5173"],
  credentials: true,
});
app.use(corsInstance);
connectDB();
const mySequelizeStore = SequelizeStore(Session.Store);
const mySequelizeStore1 = new mySequelizeStore({
  db: sequelizes,
});
app.use(
  Session({
    secret: envData.SECRET_SESSION,
    store: mySequelizeStore1,
    saveUninitialized: false,
    resave: true,
    proxy: false,
  })
);
mySequelizeStore1.sync();
initDB()
  .then(() => console.log("DB Synced"))
  .catch((err) => console.log("DB not Synced", err));
app.use(express.json());
app.use("/", allRouter);
// app.use("/image", express.static("upload/images"));
// function errHandle(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     res.json({
//       success: 0,
//       message: err.message,
//     });
//   }
//   console.log(err);
// }
// app.use(errHandle);
// console.log(port);
app.listen(port, (err) => {
  if (err) {
    console.log("server not listening");
  } else {
    console.log(`server listening at http://localhost:${port}`);
  }
});
