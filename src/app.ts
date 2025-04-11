import express from "express";
import dotenv from "dotenv";
import ProjectRoute from "./routes/project.routes";
import CertificateRoute from "./routes/certificate.routes";
import AuthRoute from "./routes/user.routes";
dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/projects", ProjectRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/certificate", CertificateRoute);
export default app;
