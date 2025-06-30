const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatbotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatbot",
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
