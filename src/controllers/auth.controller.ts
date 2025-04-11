import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { responses } from "../constants";
import { generateToken } from "../utils/generateToken";
import mongoose from "mongoose";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userIsExist = await User.findOne({ username });

    if (userIsExist) {
      res
        .status(400)
        .json({ success: false, message: responses.userIsExist, userIsExist });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).json({
        success: true,
        message: responses.successSignUp,
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser.id),
      });
    } else {
      res.status(400).json({ success: false, message: responses.errorSignUp });
    }
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

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !user.password) throw new Error(responses.errorSignIn);

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: responses.errorSignIn });
    }

    res.status(200).json({
      success: true,
      message: responses.successSignIn,
      _id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const message = Object.values(error.errors).map((err) => {
        err.message;
      });
      res
        .status(400)
        .json({
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
