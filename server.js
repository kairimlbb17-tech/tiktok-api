app.get("/tiktok", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({
      status: false,
      message: "Missing TikTok URL"
    });
  }

  try {

    // MAIN PACKAGE
    try {

      const data = await Tiktok.Downloader(url, {
        version: "v1"
      });

      return res.json({
        status: true,
        source: "package",
        result: data.result || data
      });

    } catch (e) {

      console.log("Package failed");

    }

    // FALLBACK API
    const axios = require("axios");

    const api =
      `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;

    const response = await axios.get(api);

    return res.json({
      status: true,
      source: "tikwm",
      result: response.data.data
    });

  } catch (e) {

    return res.json({
      status: false,
      error: e.toString()
    });

  }
});
