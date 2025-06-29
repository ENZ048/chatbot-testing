const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadTxtFile } = require("../controllers/fileController");

router.post("/upload/:chatbotId", upload.single("file"), uploadTxtFile);

module.exports = router;
