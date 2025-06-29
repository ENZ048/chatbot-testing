const mongoose = require("mongoose");

const chatbotDataSchema = new mongoose.Schema({
  chatbotId: { type: mongoose.Schema.Types.ObjectId, ref: "Chatbot", required: true },
  rawText: { type: String, required: true },
  source: { type: String, default: "manual-upload" },
}, { timestamps: true });

module.exports = mongoose.model("ChatbotData", chatbotDataSchema);
