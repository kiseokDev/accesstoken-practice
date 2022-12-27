import express from "express";
import { authJWT } from "../controller/authController.js";
const router = express.Router();
import * as posts from "../controller/postContorller.js";
router.use((req, res, next) => {
  console.log("middleware form posts!");
  next();
});
// Create tutorial
router.post("/postForm", posts.create);

// Retrieve all tutorials
router.get("/posts", posts.findAll);

// Retrieve tutorial by id
router.get("/posts/:id", posts.findOne);

router.get("/posts/:id/edit", authJWT);

// Update tutorial by id
router.put("/posts/:id", posts.updateById);

// Delete tutorial by id
router.delete("/posts/:id", posts.deleteById);

export default router;
