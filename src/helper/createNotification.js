import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const createNotification = async (type, user) => {
    try {
        const userData = await User.findById(user._id);
        const follow = `${userData.username} started following you.`
        const like = `${userData.username} liked your post.`

        let message;
        if (type === "follow") {
            message = follow
        } else {
            message = like
        }
        const newNoti = new Notification({
            user: userData._id,
            message: message
        })
        await newNoti.save();
        return newNoti._id
    } catch (error) {
        console.log(error);
    }
}