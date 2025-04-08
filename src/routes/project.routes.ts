import { Router } from "express";
import {
  addProject,
  getProject,
  softDelete,
  updateProject,
} from "../controllers/project.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const route = Router();

route.post("/", AuthMiddleware, addProject);
route.get("/", getProject);
route.put("/:id", AuthMiddleware, updateProject);
route.delete("/:id", AuthMiddleware, softDelete);

export default route;
