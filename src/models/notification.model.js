import mongoose, { Types } from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 30 // 30 days in seconds
    }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
