require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const connectDB = require('./model/db');
const indexRouter = require('./router/index');

const app = express();
const PORT = process.env.PORT || 3050;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Disable mongoose buffering (prevents timeout issues)
mongoose.set('bufferCommands', false);

// Routes
app.use('/api/v1', indexRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB(); // ⬅️ DB FIRST

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Server not started due to DB error ❌');
    process.exit(1);
  }
};

startServer();
