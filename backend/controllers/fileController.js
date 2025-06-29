// controllers/fileController.js
const fs = require("fs");
const Chatbot = require("../models/Chatbot");

exports.uploadTxtFile = async (req, res) => {
  try {
    console.log("Chatbot ID:", req.params.chatbotId);
    console.log("File:", req.file);

    if (!req.file) return res.status(400).json({ message: "No file received" });

    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    const chatbot = await Chatbot.findByIdAndUpdate(
      req.params.chatbotId,
      { dataText: fileContent },
      { new: true }
    );

    res.json({ message: "File uploaded and data stored", chatbot });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
