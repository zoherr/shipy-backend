import express from "express";
import { verifyToken } from "../middlewares/userVerify.js";
import { follow, getMe, myNotification } from "../controllers/user.contoller.js";

const userRouter = express.Router();

userRouter.post("/follow", verifyToken, follow);
userRouter.get("/notification", verifyToken, myNotification);
userRouter.get("/me", verifyToken, getMe)

export default userRouter;