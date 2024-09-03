import mongoose, { Schema } from "mongoose";

export type TUser = {
  username: string;
  email: string;
  age: number;
  middle_name: string;
};

export const userSchema = new Schema<TUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (v: string): Promise<boolean> => {
        const User = mongoose.model<TUser>("User", userSchema);
        const userExist = await User.findOne({ username: v });
        return !userExist;
      },
      message: '{VALUE} is already taken',
    },
  },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  middle_name: String,
});

export const Users = mongoose.model<TUser>("User", userSchema);
