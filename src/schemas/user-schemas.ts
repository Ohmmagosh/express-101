import mongoose, { Schema } from "mongoose";

export interface IUser extends Document{
  username: string;
  email: string;
  age: number;
  middle_name: string;
};

export const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  middle_name: String,
});
export const Users = mongoose.model<IUser>("User", userSchema);




