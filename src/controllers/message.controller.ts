import { Request, Response } from "express";
import { Message } from "../models/message.model";
import { responses } from "../constants";
import mongoose from "mongoose";
import { MessageService } from "../services/message.service";

export class MessageController {
  static newMessage = async (req: Request, res: Response) => {
    try {
      const item = await MessageService.createMessage(req.body);
      res
        .status(201)
        .json({ success: true, message: responses.successCreateItem, item });
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

  static getMessage = async (_: Request, res: Response) => {
    try {
      const item = await MessageService.getMessage();
      if (item.length === 0) {
        res
          .status(404)
          .json({ success: false, message: responses.errorNotFound, item });
        return;
      }
      res.status(200).json({
        success: true,
        message: responses.successGetItem,
        count: item.length,
        item,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error: error });
    }
  };

  static getMessageById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await MessageService.getMessageById(id);
      if (!item) {
        res
          .status(404)
          .json({ success: false, message: responses.errorNotFound, item });
      }
      res
        .status(200)
        .json({ success: true, message: responses.successGetItem, item });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error: error });
    }
  };

  static deleteMessage = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await MessageService.deletedMessage(id);

      if (!item) {
        res
          .status(404)
          .json({ success: false, message: responses.errorNotFound, item });
      }
      res
        .status(200)
        .json({ success: true, message: responses.successDeleteItem, item });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: responses.serverError, error: error });
    }
  };
}
