import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatbotManager = () => {
  const { clientId } = useParams();
  const [chatbots, setChatbots] = useState([]);
  const [form, setForm] = useState({ name: "", purpose: "" });

  const fetchChatbots = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE}/chatbot/client/${clientId}`
    );
    setChatbots(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_BASE}/chatbot`, {
      clientId,
      ...form,
    });
    setForm({ name: "", purpose: "" });
    fetchChatbots();
  };

  useEffect(() => {
    fetchChatbots();
  }, [clientId]);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>🤖 Manage Chatbots</h1>

      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Chatbot Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Purpose"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Add Chatbot
        </button>
      </form>

      <h3>📦 Existing Chatbots</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {chatbots.map((cb) => (
          <li key={cb._id} style={chatbotCard}>
            <strong>{cb.name}</strong> — {cb.purpose}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("file", e.target.file.files[0]);

                await axios.post(
                  `${import.meta.env.VITE_API_BASE}/upload/txt/${cb._id}`,
                  formData
                );
                alert("File uploaded successfully!");
              }}
            >
              <input type="file" name="file" accept=".txt" required />
              <button type="submit" style={{ marginTop: "8px" }}>
                Upload .txt
              </button> 
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  flex: "1 1 40%",
  minWidth: "200px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle = {
  padding: "10px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const chatbotCard = {
  padding: "12px",
  marginBottom: "10px",
  border: "1px solid #eee",
  borderRadius: "6px",
  backgroundColor: "#f9f9f9",
};

export default ChatbotManager;
