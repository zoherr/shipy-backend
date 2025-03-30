import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => {
            console.log("Database connected successfully!");
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;