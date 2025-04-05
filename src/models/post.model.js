import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
    caption: {
        type: String,
        required: true
    },
    image: String,
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: Types.ObjectId,
        ref: "User"
    }],
}, { timestamps: true });

const Post = model("Post", postSchema);
export default Post