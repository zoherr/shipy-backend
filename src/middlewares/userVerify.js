import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    const token = req.header("accessToken");
      console.log(token);

    if (!token) return res.status(400).json({ success: false, message: "Token Not Found" })
    //   if (!token) console.log("Token Not Found")

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);
    if (!user) return res.status(400).json({ success: false, message: "Unauthorized Access!!" })

    req.user = user;
    next();
};
