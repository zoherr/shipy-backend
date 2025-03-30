import { Router } from "express";
import { create, deletePost, getPost,getPostOfUser } from "../controllers/post.contoller.js";
import upload from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/userVerify.js";

const postRouter = Router();

postRouter.post("/create",verifyToken, upload.single("image"), create);
postRouter.get("/get",verifyToken,getPost)
postRouter.delete("/:id",verifyToken,deletePost)
postRouter.get("/user",verifyToken,getPostOfUser)
export default postRouter;