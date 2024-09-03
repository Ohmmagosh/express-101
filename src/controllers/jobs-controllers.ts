import mongoose from "mongoose";
import { IJob, Job as JobModel } from "../schemas/job-schemas";
import { IUser, Users } from "../schemas/user-schemas";

export const getAllJobs = async (req: any, res: any) => {
  try {
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
    }: Omit<IJob, "create_at" | "update_at"> = req.body;
    if (!name) {
      return res.status(400).send("Invalid request");
    }

    const job = new JobModel({
      name,
      description,
      end_at,
      user_id,
      create_at: new Date(),
      update_at: new Date(),
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
    const { id, name, description, end_at }: Omit<IJob, 'user_id'> & {id: string} = req.body;
    if (!id) {
      return res.status(400).send("Invalid request");
    }
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    job.name = name;
    job.description = description;
    job.update_at = new Date(Date.now());
    job.end_at = end_at;

    await job.save();
    res.send("Job updated successfully");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
};

export const deleteJob = async (req: any, res: any) => {
  try {
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


export const addUsersToJob = async (req: any, res: any) => {
  try {
    const { id, user_id }: { id: string; user_id: string } = req.body;
    if (!id || !user_id) {
      return res.status(400).send("Invalid request");
    }
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    const user: IUser & {_id: mongoose.Schema.Types.ObjectId} | null = await Users.findById(user_id);

    !user && res.status(404).send("User not found");
    
    job.user_id.push(user!._id);
    await job.save();
    res.send("User added to job successfully");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}