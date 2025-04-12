import { Request, Response } from "express";
import { Certificate } from "../models/certificate.model";
import { responses } from "../constants";
import mongoose from "mongoose";

export const addCertificate = async (req: Request, res: Response) => {
  try {
    const newItem = new Certificate(req.body);
    await newItem.save();

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

export const getCertificate = async (_: Request, res: Response) => {
  try {
    const certificate = await Certificate.find();
    if (certificate.length === 0) {
      res.status(404).json({
        success: false,
        message: responses.errorNotFound,
        certificate,
      });
    }
    res
      .status(200)
      .json({
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

export const updateCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role, description } = req.body;
    const certificate = await Certificate.findByIdAndUpdate(
      id,
      {
        name,
        role,
        description,
      },
      { new: true }
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

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
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
      message: responses.successDeleteItem,
      certificate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: responses.serverError, error: error });
  }
};
