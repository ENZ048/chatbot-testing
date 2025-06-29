import React, { useState, useEffect } from "react";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientWebsite, setNewClientWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploads, setFileUploads] = useState({});

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/client`);
      setClients(res.data);
    } catch (err) {
      console.error("Failed to load clients", err);
    }
  };

  const getEmbedScript = (chatbotId) =>
    `<script src="https://chatbot.yourdomain.com/widget-loader.js?chatbotId=${chatbotId}" async></script>`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const handleDeleteChatbot = async (chatbotId) => {
    if (!window.confirm("Delete this chatbot?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE}/chatbot/${chatbotId}`
      );
      alert("Chatbot deleted");
      setClients((prev) =>
        prev.map((c) =>
          c.chatbot && c.chatbot._id === chatbotId ? { ...c, chatbot: null } : c
        )
      );
    } catch (err) {
      alert("Failed to delete chatbot");
      console.error(err);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("Delete this client?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE}/client/${clientId}`);
      alert("Client deleted");
      setClients((prev) => prev.filter((c) => c._id !== clientId));
    } catch (err) {
      alert("Failed to delete client");
      console.error(err);
    }
  };

  const handleCreateChatbot = async (clientId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/chatbot/create/${clientId}`
      );
      alert("Chatbot created!");
      setClients((prev) =>
        prev.map((c) => (c._id === clientId ? { ...c, chatbot: res.data } : c))
      );
    } catch (err) {
      alert("Failed to create chatbot");
      console.error(err);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClientName.trim()) {
      alert("Client name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/client`, {
        name: newClientName,
        website: newClientWebsite,
      });
      setClients((prev) => [...prev, res.data]);
      setNewClientName("");
      setNewClientWebsite("");
      alert("Client added!");
    } catch (err) {
      alert("Failed to add client");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (chatbotId, file) => {
    setFileUploads((prev) => ({ ...prev, [chatbotId]: file }));
  };

  const handleUpload = async (chatbotId) => {
    if (!fileUploads[chatbotId]) {
      alert("Please select a .txt file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileUploads[chatbotId]);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/file/upload/${chatbotId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("File uploaded successfully!");
      setFileUploads((prev) => ({ ...prev, [chatbotId]: null }));
    } catch (err) {
      console.error("File upload failed:", err);
      alert("File upload failed");
    }
  };

  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      (client.website && client.website.toLowerCase().includes(term))
    );
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <h2 className="text-3xl font-semibold mb-6">
        📋 Client & Chatbot Management
      </h2>

      <form
        onSubmit={handleAddClient}
        className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl"
      >
        <input
          type="text"
          placeholder="Client Name (required)"
          className="flex-grow p-3 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Client Website (required)"
          className="flex-grow p-3 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newClientWebsite}
          onChange={(e) => setNewClientWebsite(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          className={`px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Client"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search clients by name or website..."
        className="w-full max-w-md p-3 rounded-md mb-6 bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="w-full overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="table-auto w-full text-sm divide-y divide-gray-700">
          <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Client Name
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Website</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Chatbot</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Upload .txt
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                Embed Script
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-100">
            {filteredClients.map((client) => (
              <tr key={client._id} className="hover:bg-gray-700 transition">
                <td className="px-4 py-3 min-w-[150px] break-words font-medium">
                  {client.name}
                </td>
                <td className="px-4 py-3 min-w-[180px] break-words">
                  {client.website || "—"}
                </td>
                <td className="px-4 py-3 min-w-[140px]">
                  {client.chatbot ? (
                    <span className="inline-block px-2 py-1 bg-green-600 rounded text-sm text-white">
                      ✅ {client.chatbot.name || client.chatbot._id}
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">❌ None</span>
                  )}
                </td>
                <td className="px-4 py-3 min-w-[240px]">
                  {client.chatbot ? (
                    <>
                      <input
                        type="file"
                        accept=".txt"
                        onChange={(e) =>
                          handleFileChange(
                            client.chatbot._id,
                            e.target.files[0]
                          )
                        }
                        className="mb-2 text-sm text-gray-300"
                      />
                      <button
                        onClick={() => handleUpload(client.chatbot._id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
                      >
                        Upload
                      </button>
                    </>
                  ) : (
                    <span className="italic text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 min-w-[300px]">
                  {client.chatbot ? (
                    <>
                      <textarea
                        readOnly
                        className="w-full h-20 p-2 text-xs font-mono bg-gray-900 text-gray-100 rounded resize-none border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={getEmbedScript(client.chatbot._id)}
                      />
                      <button
                        onClick={() =>
                          copyToClipboard(getEmbedScript(client.chatbot._id))
                        }
                        className="mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-white text-sm"
                      >
                        Copy
                      </button>
                    </>
                  ) : (
                    <span className="italic text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 min-w-[260px] space-y-1">
                  {!client.chatbot && (
                    <button
                      onClick={() => handleCreateChatbot(client._id)}
                      className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                    >
                      Create Chatbot
                    </button>
                  )}
                  {client.chatbot && (
                    <>
                      <button
                        onClick={() => handleDeleteChatbot(client.chatbot._id)}
                        className="w-full px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                      >
                        Delete Chatbot
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client._id)}
                        className="w-full px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
                      >
                        Delete Client
                      </button>
                    </>
                  )}
                  {!client.chatbot && (
                    <button
                      onClick={() => handleDeleteClient(client._id)}
                      className="w-full px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
                    >
                      Delete Client
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No clients found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
