const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(409).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashedPassword, name });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", adminId: admin._id });
  } catch (err) {
    console.error("Admin creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};