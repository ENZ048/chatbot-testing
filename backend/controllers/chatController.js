const Chatbot = require("../models/Chatbot");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.askChatbot = async (req, res) => {
  try {
    const { message } = req.body;
    const { chatbotId } = req.params;

    const chatbot = await Chatbot.findById(chatbotId);
    if (!chatbot) {
      return res.status(404).json({ message: "Chatbot not found" });
    }

    const context = chatbot.dataText || "";

    const contents = `
You are a helpful, friendly customer support chatbot for a business website.

Your goals:
- Respond concisely (2–4 short sentences max)
- Use bullet points or numbered steps when needed
- Make it easy to read and scan
- Avoid saying things like "based on the content provided"
- If unsure, suggest helpful next steps instead of saying "I don't know"

Business info (optional):
${context}

User question: ${message}
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    // ✅ Properly extract text from structured response
    const reply = response.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "Chat failed", error: err.message });
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
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getChatHistory = (req, res) => {
  res.json({ history: [] });
};
