const express = require("express");
const router = express.Router();
const { askChatbot, getChatbotByClientId } = require("../controllers/chatController");
const Message = require("../models/Message");

 router.post("/:chatbotId", askChatbot);


router.get("/client/:clientId", getChatbotByClientId); // ✅ this is the missing route

router.get("/history/:chatbotId", async (req, res) => {
  try {
    const messages = await Message.find({ chatbotId: req.params.chatbotId }).sort("timestamp");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

module.exports = router;
