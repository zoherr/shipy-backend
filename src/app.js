import cookieParser from "cookie-parser";
import express from "express"
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";

export const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postRouter);
app.use("/api/v1/user", userRouter)

app.get("/", (req, res) => {
    res.send("Api is working!!")
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
});