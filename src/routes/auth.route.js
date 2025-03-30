import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", signUp);
authRouter.post("/login", login);

export default authRouter;