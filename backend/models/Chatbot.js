const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  name: String,
  purpose: String,
  dataText: String, // populated from .txt upload
});

module.exports = mongoose.model("Chatbot", chatbotSchema);
