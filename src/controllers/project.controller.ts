import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { responses } from "../constants";
import mongoose from "mongoose";

export const addProject = async (req: Request, res: Response) => {
  try {
    const { body, file } = req;
    const newProject = new Project({ ...body, image: file?.filename || null });
    await newProject.save();
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

export const getProject = async (_: Request, res: Response) => {
  try {
    const project = await Project.find();
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

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, link } = req.body;
    const project = await Project.findByIdAndUpdate(
      id,
      {
        name,
        description,
        link,
      },
      { new: true } //mengembalikan data yang telah diperbarui
    );

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

export const softDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
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
