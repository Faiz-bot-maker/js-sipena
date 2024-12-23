const express = require('express');
const cors = require('cors');
const DBRoutes = require('./routes/DBRoutes');
const app = express();

// Mengaktifkan CORS
app.use(cors());

// Middleware untuk mengurai JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update routes to only use DBRoutes for now
app.use('/api', DBRoutes);

module.exports = app;
