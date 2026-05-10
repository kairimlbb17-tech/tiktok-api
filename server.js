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
    let data;

    try {
      data = await Tiktok.Downloader(url, { version: "v1" });
    } catch (e1) {
      data = await Tiktok.Downloader(url, { version: "v2" });
    }

    res.json(data);

  } catch (e) {
    res.json({
      status: false,
      message: "TikTok request blocked or failed",
      error: e.toString()
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
