import { Router } from "express";
import { addProject } from "../controllers/project.controller";

const route = Router();

route.post("/", addProject);

export default route;
