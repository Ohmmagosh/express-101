import mongoose from "mongoose";
import { TJob } from "../schemas/job-schemas";

export const getAllJobs = async (req: any, res: any) => {
  try {
    const JobModel = mongoose.model("Job");
    const jobs = await JobModel.find();
    res.json(jobs);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
};

export const getJobById = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("Invalid request");
    }
    const JobModel = mongoose.model("Job");

    const job = await JobModel.findById(id);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    res.json(job);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
};

export const createJob = async (req: any, res: any) => {
  try {
    const {
      name,
      description,
      end_at,
      user_id,
    }: Omit<TJob, "create_at" | "update_at"> = req.body;
    if (!name) {
      return res.status(400).send("Invalid request");
    }
    const JobModel = mongoose.model("Job");

    const jobExist = await JobModel.findOne({ name });
    if (jobExist) {
      return res.status(400).send("Job already exist");
    }
    const job = new JobModel({
      name,
      description,
      end_at,
      user_id,
    });
    await job.save();
    res.send("Job created successfully");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
};

export const updateJob = async (req: any, res: any) => {
  try {
    const JobModel = mongoose.model("Job");
    const { id, name, description, end_at, user_id }: TJob & {id: string} = req.body;
    if (!id) {
      return res.status(400).send("Invalid request");
    }
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    job.name = name;
    job.description = description;
    job.end_at = end_at;
    job.user_id = user_id;
    await job.save();
    res.send("Job updated successfully");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
};

export const deleteJob = async (req: any, res: any) => {
  try {
    const JobModel = mongoose.model("Job");
    const { id }: { id: string } = req.query;
    if (!id) {
      return res.status(400).send("Invalid request");
    }
    await JobModel.findByIdAndDelete(id);
    res.send("Job deleted");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
};

