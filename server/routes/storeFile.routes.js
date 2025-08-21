//người dùng download file
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:hash", (req, res) => {
  const hash = req.params.hash;
  const metaPath = path.join("files/meta", `${hash}.json`);

  if (!fs.existsSync(metaPath)) return res.status(404).send("Không tìm thấy file");

  const meta = JSON.parse(fs.readFileSync(metaPath));

  if (new Date() > new Date(meta.expired_at))
    return res.status(410).send("File đã hết hạn");

  return res.download(meta.path);
});

module.exports = router;
