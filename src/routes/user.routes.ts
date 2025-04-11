import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { getProfile, updateProfile } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const route = Router();

route.post("/signup", signUp);
route.post("/signin", signIn);
route.get("/profile", getProfile);
route.put("/profile/:id", AuthMiddleware, updateProfile);

export default route;
