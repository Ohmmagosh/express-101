import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getById,
  updateUser,
} from "../controllers/users-controllers";

export const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getById);
router.post("/create", createUser);
router.patch("/update", updateUser);
router.delete("/delete", deleteUser);
