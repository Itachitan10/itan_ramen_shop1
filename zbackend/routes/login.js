const express = require("express");
const routes = express.Router();
const query = require("../db/database"); 


routes.post("/login", async (req, res) => { 
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ mess: "No username or password" });
  }
  try {
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const result = await query(sql, [name, password]);

    if (result.length > 0) {
      const userId = result[0].id;
      req.session.userId = userId;

      res.json({ mess: "Login success", userId });
    } else {
      res.status(401).json({ mess: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ mess: "Server error", error });
  }
});

routes.get("/cartAllItem", async (req, res) => {
  const userId = req.session.userId

  if (!userId) {
    return res.status(401).json({ mess: "User not logged in" });
  }


  try {
    const sql = `SELECT * FROM products WHERE user_id = ?`;
    const result = await query(sql, [userId]);

    if (result.length > 0) {
      const cart = result.map(item => ({
        id : item.id,
        name: item.name,
        price: item.price,
        image: item.img,
        quantity :item.quantity
      }));
      res.send(cart)
    } else {
      res.status(404).json({ mess: "No items found" });
    }
  } catch (error) {
    console.error("Cart fetch error:", error);
    res.status(500).json({ mess: "Server error", error });
  }
});

// DEBUG: Get session-stored user ID
routes.get("/userId", (req, res) => {
  const userId = req.session.userId; 
  if (userId) {
    console.log("User ID from session:", userId);
    res.json({ userId });
  } else {
    res.status(404).json({ mess: "No userId in session" });
  }
});

// SIMPLE CHECK IF LOGGED IN
routes.get("/id", (req, res) => {
  const id = req.session.userId;
  
  console.log("Session userId:", id);

  if (id) {
    res.send(id.toString()); // You can also send as JSON if needed
  } else {
    res.status(400).json({ mess: "No ID in session" });
  }
});

// LOGOUT
routes.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ mess: "Logout failed", err });
    }
    res.json({ mess: "Logged out successfully" });
  })
});

module.exports = routes;
