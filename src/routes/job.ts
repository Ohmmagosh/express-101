import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/jobs-controllers";

export const router = express.Router();

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.post("/create", createJob);

router.patch("/update", updateJob);

router.delete("/delete", deleteJob);
