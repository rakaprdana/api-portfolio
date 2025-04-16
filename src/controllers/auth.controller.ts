import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { responses } from "../constants";
import { generateToken } from "../utils/generateToken";
import mongoose from "mongoose";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static signUp = async (req: Request, res: Response) => {
    try {
      const signUp = await AuthService.signUp(req.body);
      if ("error" in signUp) {
        switch (signUp.error) {
          case "USER_EXIST":
            res.status(400).json({
              success: false,
              message: responses.userIsExist,
              user: signUp.userIsExist,
            });
          case "CREATE_FAILED":
            res.status(400).json({
              success: false,
              message: responses.errorSignUp,
            });
        }
      }

      res
        .status(200)
        .json({ success: true, message: responses.successSignUp, ...signUp });
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        const message = Object.values(error.errors).map((err) => {
          err.message;
        });
        res.status(400).json({
          success: false,
          message: responses.errorField,
          error: message,
        });
      }

      res
        .status(500)
        .json({ success: false, message: responses.serverError, error });
    }
  };

  static signIn = async (req: Request, res: Response) => {
    try {
      const signIn = await AuthService.signIn(req.body);
      if ("error" in signIn) {
        switch (signIn.error) {
          case "INVALID_SIGNIN":
            res
              .status(400)
              .json({ success: false, message: responses.errorField });
          case "INVALID_PASSWORD":
            res
              .status(400)
              .json({ success: false, message: responses.errorSignIn });
        }
      }
      res
        .status(200)
        .json({ success: true, message: responses.successSignIn, ...signIn });
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        const message = Object.values(error.errors).map((err) => {
          err.message;
        });
        res.status(400).json({
          success: false,
          message: responses.errorSignIn,
          error: message,
        });
      }

      res
        .status(500)
        .json({ success: false, message: responses.serverError, error });
    }
  };
}
