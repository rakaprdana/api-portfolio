import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth-middleware";
import { MessageController } from "../controllers/message.controller";

const route = Router();

route.get("/", MessageController.getMessage);
route.get("/:id", AuthMiddleware, MessageController.getMessageById);
route.post("/", MessageController.newMessage);
route.delete("/:id", AuthMiddleware, MessageController.deleteMessage);

export default route;
