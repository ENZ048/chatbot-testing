const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatbotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatbot",
    required: true,
  },
  userMessage: String,
  botReply: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
