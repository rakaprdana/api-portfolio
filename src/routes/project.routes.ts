import { Router } from "express";
import {
  addProject,
  getProject,
  softDelete,
  updateProject,
} from "../controllers/project.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import upload from "../multer";

const route = Router();

route.post("/", upload.single("image"), addProject);
route.get("/", getProject);
route.put("/:id", AuthMiddleware, updateProject);
route.delete("/:id", AuthMiddleware, softDelete);

export default route;
