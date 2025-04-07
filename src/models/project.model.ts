import mongoose, { Schema, model } from "mongoose";

const projectSchema = new Schema({
  image: { type: String, require: false },
  name: { type: String, require: true, unique: true },
  description: { type: String, require: true },
  link: { type: String, require: false },
  is_deleted: { type: Boolean, require: false, default: false },
});

export const Project = model("Project", projectSchema);
