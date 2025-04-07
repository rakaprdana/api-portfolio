import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Database has been connected");
  } catch (error) {
    console.error("Connection failed: ", error);
    process.exit(1);
  }
};
