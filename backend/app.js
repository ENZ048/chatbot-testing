const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");


app.use(cors({
  origin: [
    "http://localhost:5173",                        // local admin panel
    "https://chatbot-testing-beta.vercel.app",                // admin dashboard (vercel)
    "https://chatbot-testing-7m25.vercel.app",              // chatbot widget
    "https://chatbot-testing-wqxk.onrender.com"                  // client websites (optional)
  ],
  credentials: true
}));


app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const clientRoutes = require("./routes/clientRoutes");
app.use("/api/client", clientRoutes);

const chatbotRoutes = require("./routes/chatbotRoutes");
app.use("/api/chatbot", chatbotRoutes)

const fileRoutes = require("./routes/fileRoutes");
app.use("/api/file", fileRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

const adminRoutes = require("./routes/adminRoute");
app.use("/api/admin", adminRoutes);

const widgetRoute = require("./routes/widgetRoute");
app.use("/widget", widgetRoute);

app.use("/widget", express.static(path.join(__dirname, "public/widget")));

app.get("/", (req, res) => {
  res.send("Chatbot backend is running!");
});

module.exports = app;
