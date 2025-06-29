import React, { useState } from "react";
import Chat from "./Chat";

const WidgetElement = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            borderRadius: "50%",
            width: 60,
            height: 60,
            background: "#6366f1",
            color: "#fff",
            border: "none",
            fontSize: 24,
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
        >
          💬
        </button>
      )}

      {open && (
        <div
          style={{
            width: 360,
            height: 520,
            background: "#1f2937",
            borderRadius: 12,
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <Chat />
        </div>
      )}
    </div>
  );
};

export default WidgetElement;
