import { createNotification } from "../helper/createNotification.js";
import User from "../models/user.model.js";

export const follow = async (req, res, next) => {
    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Target user ID is required",
            });
        }

        const targetUser = await User.findById(user);
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "Target user not found",
            });
        }

        const me = await User.findById(req.user._id);
        if (!me) {
            return res.status(404).json({
                success: false,
                message: "Current user not found",
            });
        }

        if (me.followings.includes(targetUser._id)) {
            return res.status(400).json({
                success: false,
                message: "Already following this user",
            });
        }

        me.followings.push(targetUser._id);
        targetUser.followers.push(me._id);

        const notificationId = await createNotification("follow", me);
        targetUser.notification.push(notificationId);

        await Promise.all([me.save(), targetUser.save()]);

        res.status(200).json({
            success: true,
            message: "Followed successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const myNotification = async (req, res, next) => {
    try {
        const me = await User.findById(req.user._id).populate({
            path: "notification",
            populate: {
                path: "user",
                select: "username email avatar",
            },
            options: { sort: { createdAt: -1 } },
        });

        if (!me) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        console.log(me.notification);

        res.status(200).json({
            data: me.notification,
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const userData = await User.findById(req.user._id).populate({
            path: "notification",
            populate: {
                path: "user",
                select: "username email avatar",
            },
            options: { sort: { createdAt: -1 } },
        });

        res.status(200).json({
            success: true,
            message: "User Get Successfully",
            user: {
                id: userData._id,
                username: userData.username,
                email: userData.email,
                profileImage: userData.avatar,
                notification: userData.notification,
                followers : userData.followers.length,
                followings: userData.followings.length
            }
        })

    } catch (error) {
        next(error);
    }
}