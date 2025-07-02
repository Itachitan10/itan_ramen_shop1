const express = require("express");
const routes = express.Router();
const conn = require("../db/database");

routes.post("/register", (req, res) => {
  const { name, password } = req.body;

  const query = `INSERT INTO users(username , password) VALUES ('${name}' , '${password}')`;
  conn(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error in database" });
    } else {
      res.status(200).json({ mess: "succesfull inserting database" });
    }
  });
});

module.exports = routes;
