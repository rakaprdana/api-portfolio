import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { CertificateController } from "../controllers/certificate.controller";

const route = Router();

route.post("/", AuthMiddleware, CertificateController.addCertificate);
route.get("/", CertificateController.getCertificate);
route.put("/:id", AuthMiddleware, CertificateController.updateCertificate);
route.delete("/:id", AuthMiddleware, CertificateController.deleteCertificate);

export default route;
