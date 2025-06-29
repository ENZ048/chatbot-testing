const express = require("express");
const path = require("path");
const router = express.Router();

// Serve the chat-widget.html file
router.get("/chat-widget.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/widget/chat-widget.html"));
});

// Serve the widget-loader.js (assuming it's in public/widget)
router.get("/widget-loader.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/widget/widget-loader.js"));
});

// Static files from public/widget
router.use(express.static(path.join(__dirname, "../public/widget")));

module.exports = router;
