import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";
window.process = { env: { NODE_ENV: "production" } };

// This function will be called from WordPress
window.initChatbot = () => {
  if (document.getElementById("chatbot-container")) return;

  const container = document.createElement("div");
  container.id = "chatbot-container";
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<ChatWidget />);
};
