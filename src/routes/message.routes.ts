import { Router } from "express";
import {
  deleteMessage,
  getMessage,
  getMessageById,
  newMessage,
} from "../controllers/message.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const route = Router();

route.get("/", getMessage);
route.get("/:id", AuthMiddleware, getMessageById);
route.post("/", newMessage);
route.delete("/:id", AuthMiddleware, deleteMessage);

export default route;
