import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("https://chatbot-testing-wqxk.onrender.com/api/chat/686113d2e5f92254f1ef7077", {
        message: input,
      });

      const botReply = res.data.reply || "🤖 Sorry, something went wrong.";
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Error fetching response" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white font-sans">
      {/* Chat Header */}
      <div className="p-4 bg-indigo-600 text-white font-semibold text-lg text-center">
        💬 Chat Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              msg.from === "user"
                ? "bg-indigo-500 text-white self-end ml-auto"
                : "bg-gray-700 text-gray-100 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-gray-400 italic text-sm">Typing...</div>
        )}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
