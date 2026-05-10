const express = require("express");
const cors = require("cors");
const axios = require("axios");
const https = require("https");

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
    const api =
      "https://api.tiklydown.eu.org/api/download?url=" +
      encodeURIComponent(url);

    const response = await axios.get(api, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    res.json({
      status: true,
      result: response.data
    });

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
