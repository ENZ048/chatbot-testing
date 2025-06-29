const Chatbot = require("../models/Chatbot");
const Client = require("../models/Client"); // ⬅️ make sure this is imported

exports.createChatbot = async (req, res) => {
  try {
    const { clientId } = req.params;

    const existing = await Chatbot.findOne({ clientId });
    if (existing) return res.status(409).json({ message: "Chatbot already exists" });

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    const chatbot = new Chatbot({
      clientId,
      name: `Chatbot for ${client.name}`,
      purpose: "General support assistant",
      dataText: "",
    });

    await chatbot.save();
    client.chatbot = chatbot._id;
    await client.save();

    res.status(201).json(chatbot);
  } catch (err) {
    console.error("Error creating chatbot:", err);
    res.status(500).json({ message: err.message || "Error creating chatbot" });
  }
};



exports.getChatbotByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;
    const chatbot = await Chatbot.findOne({ clientId });

    if (!chatbot) {
      return res.status(404).json({ message: "Chatbot not found for this client" });
    }

    res.json(chatbot);
  } catch (err) {
    console.error("Error fetching chatbot:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const deleted = await Chatbot.findByIdAndDelete(chatbotId);
    if (!deleted) {
      return res.status(404).json({ message: "Chatbot not found" });
    }
    res.json({ message: "Chatbot deleted successfully" });
  } catch (err) {
    console.error("Failed to delete chatbot:", err);
    res.status(500).json({ message: "Failed to delete chatbot" });
  }
};

