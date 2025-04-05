import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: Types.ObjectId,
        ref: "User"
    }],
    followings: [{
        type: Types.ObjectId,
        ref: "User"
    }],
    notification: [{
        type: Types.ObjectId,
        ref: "Notification"
    }],
    avatar: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;