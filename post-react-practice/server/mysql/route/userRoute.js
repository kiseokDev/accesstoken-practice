import express from "express";
const router = express.Router();
import * as users from "../controller/userController.js";
router.use((req, res, next) => {
  console.log("middleware form user!");
  next();
});
// Create tutorial
router.post("/userForm", users.create);

// Retrieve all tutorials
router.get("/users", users.findAll);

// Retrieve tutorial by id
router.get("/users/:id", users.findOne);

// Update tutorial by id
router.put("/users/:id", users.updateById);

// Delete tutorial by id
router.delete("/users/:id", users.deleteById);

export default router;
