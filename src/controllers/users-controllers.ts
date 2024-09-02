import mongoose from "mongoose";
import { userSchema, TUser } from "../schemas/user-schemas";

export async function getById(req: any, res: any) {
  try {
    const userId = req.params.id;
    const User = mongoose.model("User", userSchema);
    !userId && res.status(400).send("Invalid request asddsa");
    const user = await User.findById(userId);
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
    const User = mongoose.model("User", userSchema);
    !userId && res.status(400).send("Invalid request asddsa");
    const user = await User.findById(userId);
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
      return res.status(400).send("Invalid request dasdasd");
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
    const User = mongoose.model("User", userSchema);
    const { id }: { id: string } = req.query;
    if (!id) {
      return res.status(400).send("Invalid request");
    }
    await User.findByIdAndDelete(id);
    res.send("User deleted");
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}

export async function createUser(req: any, res: any) {
  try {
    const User = mongoose.model("User", userSchema);
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
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new User({ username, email, age, middle_name });
    
    await user.save().catch((error)=> {
      console.log(error)
      if (error.name === "ValidationError") {
        return res.status(400).send("Invalid request");
      }else {
        return res.status(500).send("An error occured");
      }
    });
    res.json(user);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}

export async function getAllUsers(req: any, res: any) {
  try {
    const User = mongoose.model<TUser>("User", userSchema);
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("An error occured");
  }
}
