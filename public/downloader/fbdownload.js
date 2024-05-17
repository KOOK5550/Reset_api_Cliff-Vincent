const cors = require("cors");
const axios = require("axios");
const fs = require("fs");

exports.name = "/anydownload";
exports.index = async function (req, res) {
  const link = "https://anydownloader.com/wp-json/aio-dl/video-data/";
  const { url } = req.query;
  if (!url) return res.json({ error: "No url provided" });
  try {
    const headers = {
      "Remote-Address": "[2606:4700:20::681a:898]:443",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };
    const data = {
      url: encodeURI(url),
      token: "3f0fdbdab754b8cb31a85e06c52b56ff3eb894406d13c8bd6b02f8110b7e3e8d",
    };
    const response = await axios.post(link, data, { headers });
    let vid = response.data.medias[0].url;
    const video = (await axios.get(vid, { responseType: "arraybuffer" })).data;
    const path = __dirname + "/cache/capcut.mp4";
    fs.writeFileSync(path, Buffer.from(video, "utf-8"));
    res.sendFile(path);
  } catch (e) {
    return res.json({ error: e.message });
  }
};
