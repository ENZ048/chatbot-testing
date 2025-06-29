const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    website: { type: String, required: true, unique: true }, // required + unique
    contactInfo: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatbot: { type: mongoose.Schema.Types.ObjectId, ref: "Chatbot" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
