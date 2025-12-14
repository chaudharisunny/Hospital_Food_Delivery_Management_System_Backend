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

// Routes
app.use('/api/v1', indexRouter);

// Health check (VERY useful on Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Disable mongoose buffering (prevents silent timeouts)
mongoose.set('bufferCommands', false);

// Start server only after DB connects
const startServer = async () => {
  try {
    console.log('Starting server...');
    await connectDB(); // ⬅️ DB first
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Server failed to start ❌');
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
