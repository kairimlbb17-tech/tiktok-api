const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: true, message: "API root working" });
});

app.get("/tiktok", (req, res) => {
  res.json({ status: true, message: "TikTok route working" });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
