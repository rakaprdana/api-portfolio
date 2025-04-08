import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user";
import { AuthRequest } from "../interfaces/auth-request";
import { responses } from "../constants";

export const AuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res
          .status(401)
          .json({ success: false, message: responses.errorUserNotFound });
      }

      req.user = user as unknown as IUser;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Access denied. Please check your token",
    });
  }
};
