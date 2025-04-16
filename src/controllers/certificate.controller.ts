import { Request, Response } from "express";
import { Certificate } from "../models/certificate.model";
import { responses } from "../constants";
import mongoose from "mongoose";
import { CertificateService } from "../services/certificate.service";

export class CertificateController {
  static addCertificate = async (req: Request, res: Response) => {
    try {
      const newItem = await CertificateService.createCertifacte(req.body);
      res
        .status(201)
        .json({ success: true, message: responses.successCreateItem, newItem });
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        const message = Object.values(error.errors).map((err) => err.message);
        res.status(400).json({
          success: false,
          message: responses.errorCreateItem,
          error: message,
        });
      }
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error });
    }
  };

  static getCertificate = async (_: Request, res: Response) => {
    try {
      const certificate = await CertificateService.getCertificate();
      if (certificate.length === 0) {
        res.status(404).json({
          success: false,
          message: responses.errorNotFound,
          certificate,
        });
      }
      res.status(200).json({
        success: true,
        message: responses.successGetItem,
        count: certificate.length,
        certificate,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error: error });
    }
  };

  static updateCertificate = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const certificate = await CertificateService.updateCertificate(
        id,
        req.body
      );
      if (!certificate) {
        res.status(404).json({
          success: false,
          message: responses.errorNotFound,
          certificate,
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: responses.successUpdateItem,
        certificate,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error: error });
    }
  };

  static deleteCertificate = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const certificate = await CertificateService.deleteCertificate(id);
      if (!certificate) {
        res.status(404).json({
          success: false,
          message: responses.errorNotFound,
          certificate,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: responses.successDeleteItem,
        certificate,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error: error });
    }
  };
}
