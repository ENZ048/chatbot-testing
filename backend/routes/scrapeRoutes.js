const express = require("express");
const { scrapeWebsite, abortScraping } = require("../controllers/scrapeController");
const router = express.Router();

router.post("/start/:chatbotId", scrapeWebsite);
router.post("/abort/:chatbotId", abortScraping);

module.exports = router;
