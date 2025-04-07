import express from "express";
import dotenv from "dotenv";
import ProjectRoute from "./routes/project.routes";
dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/projects", ProjectRoute);
export default app;
