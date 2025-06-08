import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import uploadToCloudinary from "../helper/uploadToCloudinary.js";

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username,email or password not found!!"
            });
        };

        const ifUserExist = await User.find({ $or: [{ email }, { username }] });

        if (!ifUserExist) {
            return res.status(400).json({
                success: false,
                message: "User already exist!!"
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const avatar = `https://api.dicebear.com/9.x/notionists/svg?seed=${username}`
        const newUser = new User({
            ...req.body,
            avatar: avatar,
            password: hashedPassword,
            username: username.toLowerCase(),
            email: email.toLowerCase()
            
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "5d" });

        await newUser.save();

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).status(200).json({   
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.avatar
            }
        })

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email or password not found!!"
            });
        };

        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "User not found!!"
            });
        }

        const checkPassword = await bcrypt.compare(password, userData.password);

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Correct password"
            });
        }

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: "5d" });

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).status(200).json({
            success: true,
            message: "User Login Successfully",
            token,
            user: {
                id: userData._id,
                username: userData.username,
                email: userData.email,
                profileImage: userData.avatar
            }
        })

    } catch (error) {
        next(error);
    }
}