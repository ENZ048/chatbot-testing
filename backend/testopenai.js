require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello!" }],
    });

    console.log("✅ OpenAI response:", completion.choices[0].message.content);
  } catch (err) {
    console.error("❌ OpenAI Error:", err.message);
  }
})();
