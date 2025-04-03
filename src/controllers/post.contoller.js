import uploadToCloudinary from "../helper/uploadToCloudinary.js";
import Post from "../models/post.model.js";
import fs from "fs"

export const create = async (req, res, next) => {
    try {

        const { image, caption } = req.body;
        if (!image || !caption) {
            return res.status(400).json({
                success: false,
                message: "Caption or Image not found!!"
            });
        };

        const { url, public_id } = await uploadToCloudinary(image);

        const post = new Post({
            ...req.body,
            image: url,
            user: req.user._id
        });

        await post.save();
        res.status(200).json({
            post,
            success: true,
            message: "Post Created Successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getPost = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const posts = await Post.find().sort({ createdAt: -1 })
            .skip(skip).limit(limit)
            .populate("user", "username avatar");

        const totalBooks = await Post.countDocuments();

        res.status(200).send({ posts, currentPage: page, totalBooks, totalPages: Math.ceil(totalBooks / limit) })
    } catch (error) {
        next(error);
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found!!"
            });
        };
        if (post.user !== req.user._id) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized Access!!"
            });
        };
        await post.deleteOne();
        res.status(200).json({
            success: true,
            message: "Delete Successfully"
        });
    } catch (error) {
        next(error);
    }
}

export const getPostOfUser = async (req, res, next) => {
    try {
        const posts = await Post.find({ user: req.user.id });
        res.status(200).json({
            posts
        })
    } catch (error) {
        next(error);
    }
}