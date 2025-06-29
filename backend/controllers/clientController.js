const Client = require("../models/Client");
const Chatbot = require("../models/Chatbot");

exports.createClient = async (req, res) => {
  try {
    const { name, website, contactInfo } = req.body;

    if (!name || !website) {
      return res.status(400).json({ message: "Name and website are required" });
    }

    const existing = await Client.findOne({ website: website.trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Client with this website already exists" });
    }

    const client = new Client({
      name,
      website: website.trim().toLowerCase(),
      contactInfo,
    });

    await client.save();

    res.status(201).json(client);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).json({ message: "Error creating client" });
  }
};



exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("chatbot");
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};


exports.deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const deleted = await Client.findByIdAndDelete(clientId);

    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    await Chatbot.deleteOne({ clientId });

    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ message: "Failed to delete client" });
  }
};
