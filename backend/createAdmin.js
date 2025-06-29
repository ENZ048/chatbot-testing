const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const passwordHash = await bcrypt.hash("pratik", 10);
  const user = new User({
    email: "pratik@gmail.com",
    passwordHash,
  });
  await user.save();
  console.log("✅ Admin user created.");
  process.exit();
});
