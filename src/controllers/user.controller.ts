import { Request, Response } from "express";
import { User } from "../models/user.model";
import { responses } from "../constants";
import { UserService } from "../services/user.service";

export class UserController {
  static getProfile = async (req: Request, res: Response) => {
    try {
      const profile = await UserService.getProfile(req.body);
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

  static updateProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const profile = await UserService.updateProfile(id, req.body);

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
}
