import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, "Username is required"],
    unique: true,
  },
  email: { type: String, require: [true, "Email is required"], unique: true },
  password: { type: String, require: [true, "Password is required"] },
});

export const User = model("User", userSchema);
