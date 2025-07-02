const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const conn = require('./db/database'); // Assuming this connects to your DB

// Parse incoming JSON and cookies
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));


app.use(session({
  secret: "your_secret_key", // 🔐 Replace with a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Import route handlers
const login = require('./routes/login');
const register = require('./routes/register');
const product = require('./routes/product');
const cart = require('./routes/cart');
const fullVerify = require('./routes/verefy');
const path = require('path');

// Mount routes
app.use('/', login);
app.use('/', register);
app.use('/', product);
app.use('/', cart);
app.use('/', fullVerify)

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
