import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import upload from "../multer";
import { ProjectController } from "../controllers/project.controller";

const route = Router();

route.get("/", ProjectController.getProject);
route.post(
  "/",
  upload.array("image", 5),
  AuthMiddleware,
  ProjectController.addProject
);
route.put("/:id", AuthMiddleware, ProjectController.updateProject);
route.delete("/:id", AuthMiddleware, ProjectController.softDelete);

export default route;
