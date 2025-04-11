import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import {
  addCertificate,
  deleteCertificate,
  getCertificate,
  updateCertificate,
} from "../controllers/certificate.controller";

const route = Router();

route.post("/", AuthMiddleware, addCertificate);
route.get("/", getCertificate);
route.put("/:id", AuthMiddleware, updateCertificate);
route.delete("/:id", AuthMiddleware, deleteCertificate);

export default route;
