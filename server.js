const express = require("express");
const cors = require("cors");
const Tiktok = require("@tobyg74/tiktok-api-dl");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "TikTok API Running"
  });
});

app.get("/tiktok", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({
      status: false,
      message: "Missing TikTok URL"
    });
  }

  try {
    const data = await Tiktok.Downloader(url, {
      version: "v1"
    });

    res.json(data);

  } catch (e) {
    res.json({
      status: false,
      error: e.toString()
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
