

const express = require("express");
const routes = express.Router();
const conn = require('../db/database');

// POST: Add item to cart
routes.post("/cartValue", async (req, res) => {
    const { img, name, price, user_id, quantity } = req.body;

    if (!img || !name || !price || !user_id || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = `INSERT INTO products (price, img, name, user_id, quantity) VALUES (?, ?, ?, ?, ?)`;
    const values = [price, img, name, user_id, quantity];

    try {
        await conn(query, values);
        res.status(200).json({ message: "Successfully inserted into database" });
        console.log("Successfully inserted into database");
    } catch (err) {
        console.error("Error inserting into database:", err);
        res.status(500).json({ message: "Database error" });
    }
});

// POST: Delete item from cart
routes.post("/deleteCartItem", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Missing item ID" });
    }

    const query = `DELETE FROM products WHERE id = ? LIMIT 1`;

    try {
        const result = await conn(query, [id]);

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: "Item not found" });
        }

        res.json({ success: true, message: "Item deleted successfully" });
    } catch (err) {
        console.error("Error deleting cart item:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = routes;
