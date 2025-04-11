import { model, Schema } from "mongoose";

const certificateSchema = new Schema({
  name: { type: String, require: [true, "Location is required"] },
  role: { type: String, require: [true, "Role is required"] },
  description: { type: String, require: [true, "Description is required"] },
  is_deleted: { type: Boolean, default: false },
});

export const Certificate = model("Certificate", certificateSchema);
