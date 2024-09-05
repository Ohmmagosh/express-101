import mongoose from "mongoose";
import { userSchema,IUser, Users } from "../schemas/user-schemas";

export async function getById(req: any, res: any) {
  try {
    const userId = req.params.id;
    !userId && res.status(400).send("Invalid request asddsa");
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}

export async function updateUser(req: any, res: any) {
  try {
    const userId = req.query.id;
    !userId && res.status(400).send("Invalid request asddsa");
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const {
      username,
      email,
      age,
      middle_name,
    }: { username: string; email: string; age: string; middle_name: string } =
      req.body;
    if (!username || !email || !age) {
      return res.status(400).send("Invalid request");
    }
    user.username = username;
    user.email = email;
    user.age = parseInt(age);
    user.middle_name = middle_name;

    await user.save();
    res.send("updated successfully");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}

export async function deleteUser(req: any, res: any) {
  try {
    const { id }: { id: string } = req.query;
    if (!id) {
      return res.status(400).send("Invalid request");
    }
    await Users.findByIdAndDelete(id);
    res.send("User deleted");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}

export async function createUser(req: any, res: any) {
  try {   
    const {
      username,
      email,
      age,
      middle_name,
    }: { username: string; email: string; age: number; middle_name: string } =
      req.body;
    if (!username || !email || !age) {
      return res.status(400).send("Invalid request");
    }
    const isExist = await Users.findOne({ username: username });
    if (isExist) {
      return res.status(400).send("Username already exist");
    }

    const user = new Users({ username, email, age, middle_name });

    await user.save();
    res.json(user);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).send(error.message);
    }
    res.status(500).send({ error });
  }
}

export async function getAllUsers(req: any, res: any) {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}
