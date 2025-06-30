import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { marked } from "marked";

const API_BASE = "https://chatbot-testing-wqxk.onrender.com/api/chat";

const CHATBOT_ID = "686113d2e5f92254f1ef7077";
const CLIENT_ID = "68610e8a195cad5603a04edc";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botName, setBotName] = useState("Chatbot");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    axios
      .get(`${API_BASE}/client/${CLIENT_ID}`)
      .then((res) => {
        setBotName(res.data.name || "Chatbot");
      })
      .catch((err) => {
        console.error(
          "❌ Error fetching chatbot config:",
          err.response?.data || err.message
        );
      });
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/${CHATBOT_ID}`, {
        message: input,
      });

      const botMessage = { from: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("❌ Chatbot error:", err.response?.data || err.message);
      const errorMsg = {
        from: "bot",
        text: "Oops! Something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Loading dots animation component
  function LoadingDots() {
    return (
      <span
        aria-label="loading"
        role="img"
        style={{
          display: "inline-block",
          fontWeight: "bold",
          fontSize: 18,
          letterSpacing: 4,
          color: "#4f46e5",
          userSelect: "none",
          width: 40,
        }}
      >
        <span style={{ animation: "dot1 1.4s infinite ease-in-out both" }}>
          .
        </span>
        <span style={{ animation: "dot2 1.4s infinite ease-in-out both" }}>
          .
        </span>
        <span style={{ animation: "dot3 1.4s infinite ease-in-out both" }}>
          .
        </span>

        <style>{`
          @keyframes dot1 {
            0%, 80%, 100% { opacity: 0; }
            40% { opacity: 1; }
          }
          @keyframes dot2 {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
          @keyframes dot3 {
            0%, 20%, 100% { opacity: 0; }
            60% { opacity: 1; }
          }
        `}</style>
      </span>
    );
  }

  if (!isOpen) {
    // Render floating bubble when closed
    return (
      <div
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
        title="Open chat"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#4338ca",
          width: 56,
          height: 56,
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(67, 56, 202, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          fontSize: 28,
          userSelect: "none",
          zIndex: 9999,
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#3730a3")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#4338ca")
        }
      >
        🤖
      </div>
    );
  }

  // Render modal when open
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 320,
        height: 560,
        backgroundColor: "#fff",
        boxShadow:
          "0 8px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9999,
      }}
      aria-label="Chatbot window"
    >
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(90deg, #4F46E5 0%, #3B82F6 100%)",
          color: "white",
          padding: "1rem 1.25rem",
          fontWeight: 600,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>{botName}</span>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 24,
            cursor: "pointer",
            fontWeight: "bold",
            lineHeight: 1,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
        >
          &times;
        </button>
      </header>

      {/* Messages container */}
      <main
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          backgroundColor: "#f9fafb",
          scrollbarWidth: "thin",
          scrollbarColor: "#a5b4fc transparent",
        }}
      >
        {messages.length === 0 && !loading && (
          <p
            style={{
              color: "#6b7280",
              fontStyle: "italic",
              textAlign: "center",
              marginTop: 20,
              userSelect: "none",
            }}
          >
            Ask me anything!
          </p>
        )}

        {messages.map((msg, idx) => {
          const isUser = msg.from === "user";

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: 12,
                alignItems: "flex-end",
              }}
              aria-live="polite"
            >
              {!isUser && (
                <div
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                    userSelect: "none",
                  }}
                  aria-label="Bot avatar"
                >
                  🤖
                </div>
              )}

              <div
                style={{
                  backgroundColor: isUser ? "#4338ca" : "#e0e7ff",
                  color: isUser ? "white" : "#3730a3",
                  padding: "10px 16px",
                  borderRadius: 20,
                  maxWidth: "80%",
                  fontSize: 14,
                  lineHeight: 1.4,
                  boxShadow: isUser
                    ? "0 4px 12px rgba(67, 56, 202, 0.3)"
                    : "0 2px 8px rgba(224, 231, 255, 0.5)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  display: "inline-block",
                }}
              >
                {isUser ? (
                  msg.text
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                  />
                )}
              </div>

              {isUser && (
                <div
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    userSelect: "none",
                  }}
                  aria-label="User avatar"
                >
                  🧑
                </div>
              )}
            </div>
          );
        })}

        {/* Loading indicator */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                backgroundColor: "#e0e7ff",
                color: "#4338ca",
                padding: "10px 16px",
                borderRadius: 20,
                maxWidth: "80%",
                fontSize: 14,
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(224, 231, 255, 0.5)",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <LoadingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input area */}
      <footer
        style={{
          padding: "0.75rem 1rem",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          gap: 8,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            resize: "none",
            padding: "10px 14px",
            fontSize: 14,
            borderRadius: 20,
            border: "1px solid #d1d5db",
            outline: "none",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "inset 0 1px 3px rgb(0 0 0 / 0.1)",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          aria-label="Send message"
          disabled={!input.trim() || loading}
          style={{
            backgroundColor: input.trim() && !loading ? "#4338ca" : "#e0e7ff",
            border: "none",
            borderRadius: "50%",
            width: 50,
            height: 50,
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20, // size for emoji
            color: input.trim() && !loading ? "white" : "#4338ca",
            transition: "background-color 0.3s ease",
          }}
        >
          🚀
        </button>
      </footer>
    </div>
  );
}
