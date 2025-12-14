require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./model/db');
const indexRouter = require('./router/index');

const app = express();
const PORT = process.env.PORT || 3050;

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', indexRouter);

// START SERVER ONLY AFTER DB CONNECTS
const startServer = async () => {
  try {
    await connectDB();   // DB FIRST
    app.listen(PORT);    // SERVER AFTER
  } catch (err) {
    process.exit(1);
  }
};


startServer();
