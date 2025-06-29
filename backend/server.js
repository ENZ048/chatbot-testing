
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// const uri = "mongodb+srv://pratik:pratik@2001@chatbot-db.dxcoel2.mongodb.net/?retryWrites=true&w=majority&appName=chatbot-db"


console.log('Connecting to:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});
