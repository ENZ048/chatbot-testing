const express = require("express");
const router = express.Router();
const { askChatbot, getChatbotByClientId } = require("../controllers/chatController");

router.post("/:chatbotId", askChatbot);
router.get("/client/:clientId", getChatbotByClientId); // ✅ this is the missing route

module.exports = router;
