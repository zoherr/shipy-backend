import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";

dotenv.config();

app.listen(process.env.PORT, '0.0.0.0', () => {
    connectDB();
    console.log("Server is running on port 8000!");
});