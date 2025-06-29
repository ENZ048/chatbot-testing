import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatModal from "./ChatModal";
import "./App.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        // color: "white",
        fontFamily: "'Inter', sans-serif",
        
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "900",
          marginBottom: "2rem",
          textShadow:
            "2px 2px 6px rgba(0,0,0,0.3)",
          maxWidth: "700px",
          lineHeight: 1.2,
          userSelect: "none",
          color: "white",
          textAlign: "center",
        }}
      >
        This is a demo website to test our chatbot
      </h1>

      {/* Chat bubble at bottom right */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
      >
        <ChatBubble onClick={() => setIsOpen(true)} />
      </div>

      {isOpen && <ChatModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
