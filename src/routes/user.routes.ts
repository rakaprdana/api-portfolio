import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";

const route = Router();

route.post("/signup", AuthController.signUp);
route.post("/signin", AuthController.signIn);
route.get("/profile", UserController.getProfile);
route.put("/profile/:id", AuthMiddleware, UserController.updateProfile);

export default route;
