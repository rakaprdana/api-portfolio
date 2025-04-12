import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  name: { type: String, require: [true, "Sender's name is required"] },
  email: { type: String, require: [true, "Sender's email is required "] },
  message: { type: String, require: [true, "Sender's message is required"] },
  is_deleted: { type: Boolean, default: false },
});

export const Message = model("Message", messageSchema);
