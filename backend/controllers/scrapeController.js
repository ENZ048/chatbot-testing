const axios = require("axios");
const cheerio = require("cheerio");
const Chatbot = require("../models/Chatbot");

let activeControllers = {}; // track aborts by chatbotId

function getInternalLinks(baseUrl, html) {
  const $ = cheerio.load(html);
  const links = new Set();

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;

    if (href.startsWith("/")) {
      links.add(new URL(href, baseUrl).href);
    } else if (href.startsWith(baseUrl)) {
      links.add(href);
    }
  });

  return Array.from(links);
}

exports.scrapeWebsite = async (req, res) => {
  const { chatbotId } = req.params;
  const { url } = req.body;

  const controller = new AbortController();
  activeControllers[chatbotId] = controller;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendProgress = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const visited = new Set();
    const queue = [url];
    let context = "";

    while (queue.length) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);

      sendProgress({ status: "scraping", url: current, done: visited.size });

      const html = (await axios.get(current, { signal: controller.signal })).data;
      const $ = cheerio.load(html);
      const text = $("body").text().replace(/\s+/g, " ").trim();
      context += `\n\n---\n\n${text}`;

      if (visited.size < 10) {
        const links = getInternalLinks(url, html);
        for (const link of links) {
          if (!visited.has(link)) queue.push(link);
        }
      }
    }

    await Chatbot.findByIdAndUpdate(chatbotId, { dataText: context });
    sendProgress({ status: "done", pages: visited.size });
    res.end();
  } catch (err) {
    if (controller.signal.aborted) {
      sendProgress({ status: "aborted" });
    } else {
      console.error("Scraping failed:", err.message);
      sendProgress({ status: "error", message: err.message });
    }
    res.end();
  } finally {
    delete activeControllers[chatbotId];
  }
};

exports.abortScraping = (req, res) => {
  const { chatbotId } = req.params;
  if (activeControllers[chatbotId]) {
    activeControllers[chatbotId].abort();
    delete activeControllers[chatbotId];
    return res.json({ message: "Scraping aborted" });
  }
  res.status(404).json({ message: "No active scraping task" });
};
