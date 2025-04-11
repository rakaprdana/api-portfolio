import { Request, Response } from "express";
import { User } from "../models/user.model";
import { responses } from "../constants";

export const getProfile = async (_: Request, res: Response) => {
  try {
    const profile = await User.find();
    if (!profile)
      res
        .status(404)
        .json({ success: false, message: responses.errorNotFound });
    res
      .status(200)
      .json({ success: true, message: responses.successGetItem, profile });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: responses.serverError, error: error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, description } = req.body;
    const profile = await User.findByIdAndUpdate(
      id,
      { role, description },
      { new: true }
    );

    if (!profile) {
      res
        .status(404)
        .json({ success: false, message: responses.errorNotFound, profile });
      return;
    }

    res
      .status(201)
      .json({ success: true, message: "Profile has beed updated", profile });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: responses.serverError, error });
  }
};
