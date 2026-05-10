const express = require("express");
const cors = require("cors");
const Tiktok = require("@tobyg74/tiktok-api-dl");

const app = express();

app.use(cors());

app.get("/", (req, res) => {

  res.json({
    status: true,
    message: "TikTok API running"
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

    // SHOW FULL RESPONSE
    res.json(data);

  } catch (error) {

    res.json({
      status: false,
      message: "Failed to fetch TikTok data",
      error: error.toString()
    });

  }

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});
