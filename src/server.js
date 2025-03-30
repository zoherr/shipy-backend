import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import job from "./utils/cron.js";

dotenv.config();
job.start()
// app.listen(process.env.PORT, '0.0.0.0', () => {
//     connectDB();
//     console.log("Server is running on port 8000!");
// });

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server is running on port 8000!");
});

// https://shipy-backend.onrender.com/