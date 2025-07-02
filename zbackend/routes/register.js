const express = require("express");
const routes = express.Router();
const query = require("../db/database");

// Register route
routes.post("/register", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Missing name or password" });
  }

  const sql = `INSERT INTO users (username, password) VALUES ($1, $2)`;
  const values = [name, password]; // plain password, OK lang for local projects

  try {
    await query(sql, values);
    res.status(200).json({ message: "Successfully inserted into database" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
});

module.exports = routes;
