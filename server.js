const express = require("express");
const cors = require("cors");
const Tiktok = require("@tobyg74/tiktok-api-dl");

const app = express();

app.use(cors());

app.get("/", (req, res) => {

    res.json({
        status: true,
        message: "TikTok API is running"
    });

});

app.get("/tiktok", async (req, res) => {

    try {

        const url = req.query.url;

        if (!url) {

            return res.json({
                status: false,
                message: "Missing TikTok URL"
            });

        }

        const data = await Tiktok.Downloader(url, {
            version: "v1"
        });

        res.json({
            status: true,
            result: data.result
        });

    } catch (error) {

        res.json({
            status: false,
            message: "Failed to fetch TikTok data",
            error: error.toString()
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("API running on port " + PORT);

});
