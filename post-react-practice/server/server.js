import { createRequire } from "module";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  login,
  accessToken,
  refreshToken,
  loginSucess,
  logout,
} from "./controller/login.js";

const app = express();
// const maria = require("./mysql/config/maria");

const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
  })
);
import loginRouter from "./mysql/route/loginRoute.js";
import postRouter from "./mysql/route/postRoute.js";
import userRouter from "./mysql/route/userRoute.js";
// app.use("/", router);
app.use("/", loginRouter);
app.use("/", postRouter);
app.use("/", userRouter);

// // DB Connection
import db from "./mysql/model/index.js";
db.sequelizeConfig.sync();

app.listen(process.env.PORT, function () {
  console.log(`server is on ${process.env.PORT}`);
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
