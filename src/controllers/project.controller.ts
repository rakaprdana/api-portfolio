import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { responses } from "../constants";

export const addProject = async (req: Request, res: Response) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({
      success: true,
      message: responses.successCreateProject,
      newProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: responses.errorCreateProject, error });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.find();
    if (project.length === 0) {
      res
        .status(404)
        .json({ success: false, message: responses.errorNotFound, project });
    }
    res
      .status(201)
      .json({ success: true, message: responses.successGetProject, project });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: responses.serverError, error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, link } = req.body;
    const project = await Project.findByIdAndUpdate(id, {
      name,
      description,
      link,
    });

    if (!project) {
      res
        .status(404)
        .json({ success: false, message: responses.errorNotFound, project });
    }

    res.status(201).json({
      success: true,
      message: responses.successUpdateProject,
      project,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: responses.errorUpdateProject, error });
  }
};
