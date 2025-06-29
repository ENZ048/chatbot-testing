const express = require("express");
const router = express.Router();
const {
  createClient,
  getAllClients,
  deleteClient,
} = require("../controllers/clientController");

router.post("/", createClient);
router.get("/", getAllClients);
router.delete("/:clientId", deleteClient);  // new delete route

module.exports = router;
