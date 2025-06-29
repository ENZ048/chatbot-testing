const express = require("express");
const router = express.Router();
const { createChatbot, getChatbotByClientId, deleteChatbot  } = require("../controllers/chatbotController");

router.post("/create/:clientId", createChatbot);
router.get("/client/:clientId", getChatbotByClientId);
router.delete("/:chatbotId", deleteChatbot);

module.exports = router;
