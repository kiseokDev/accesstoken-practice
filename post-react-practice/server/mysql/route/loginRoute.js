import express from "express";
const router = express.Router();
import * as Login from "../../controller/login.js";
import { authJWT } from "../controller/authController.js";
import { login } from "../controller/loginController.js";
router.use((req, res, next) => {
  console.log("middleware form login!");
  next();
});
// Create tutorial
router.post("/login", login);
// router.get("/login/success", Login.loginSucess);
router.get("/login/success", authJWT);
router.get("/logout", Login.logout);

export default router;
