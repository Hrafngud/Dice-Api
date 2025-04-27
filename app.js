const express = require('express');
const path = require('path');
const cors = require('cors'); // Require cors
const rollRoutes = require('./src/routes/rollRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/roll', rollRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Dice API running on port ${PORT}`);
});
