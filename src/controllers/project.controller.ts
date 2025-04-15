import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { responses } from "../constants";
import mongoose from "mongoose";
import { ProjectService } from "../services/project.service";

export class ProjectController {
  static addProject = async (req: Request, res: Response) => {
    try {
      const imagePath = (req.files as Express.Multer.File[]).map((file) =>
        file.path.replace(/\\/g, "/")
      );
      const newProject = await ProjectService.createProject(
        req.body,
        imagePath
      );
      res.status(201).json({
        success: true,
        message: responses.successCreateItem,
        newProject,
      });
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

  static getProject = async (_: Request, res: Response) => {
    try {
      const project = await ProjectService.getProject();
      if (project.length === 0) {
        res
          .status(404)
          .json({ success: false, message: responses.errorNotFound, project });
      }
      res.status(200).json({
        success: true,
        message: responses.successGetItem,
        count: project.length,
        project,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await ProjectService.updateProject(id, req.body);
      if (!project) {
        res
          .status(404)
          .json({ success: false, message: responses.errorNotFound });
        return;
      }

      res.status(200).json({
        success: true,
        message: responses.successUpdateItem,
        project,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.errorUpdateItem, error });
    }
  };

  static softDelete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await ProjectService.deleteProject(id);
      if (!project) {
        res
          .status(404)
          .json({ success: false, message: responses.errorNotFound, project });
      }

      res.status(200).json({
        success: true,
        message: responses.successDeleteItem,
        project,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.errorDeleteItem, error });
    }
  };
}
