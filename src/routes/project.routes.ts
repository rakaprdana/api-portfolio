import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import upload from "../multer";
import { ProjectController } from "../controllers/project.controller";

const route = Router();

route.post("/", upload.single("image"), ProjectController.addProject);
route.get("/", ProjectController.getProject);
route.put("/:id", AuthMiddleware, ProjectController.updateProject);
route.delete("/:id", AuthMiddleware, ProjectController.softDelete);

export default route;
