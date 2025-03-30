import cron from "cron"
import https from "https"

const job = new cron.CronJob("*/14 * * * *", function () {
    https.get("https://shipy-backend.onrender.com/", (res) => {
        if (res.statusCode === 200) console.log("GET")
        else console.log(res.statusCode);

    }).on("error", (e) => console.error(e))
})
export default job