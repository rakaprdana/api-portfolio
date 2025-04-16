import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  image: [{ type: String, require: false }],
  name: {
    type: String,
    require: [true, "Project name is required"],
    unique: true,
  },
  description: { type: String, require: [true, "Description is required"] },
  link: { type: String, require: false },
  is_deleted: { type: Boolean, require: false, default: false },
});

export const Project = model("Project", projectSchema);
