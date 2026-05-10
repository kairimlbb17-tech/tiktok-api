const express = require("express");
const cors = require("cors");
const axios = require("axios");

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
    const api = "https://www.tikwm.com/api/?url=" + encodeURIComponent(url);
    const response = await axios.get(api);

    if (!response.data || !response.data.data) {
      return res.json({
        status: false,
        message: "No data from TikWM",
        raw: response.data
      });
    }

    res.json({
      status: true,
      source: "tikwm",
      result: response.data.data
    });

  } catch (e) {
    res.json({
      status: false,
      message: "API failed",
      error: e.toString()
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
