require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./model/db");
const indexRouter = require("./router/index");
const connectDB = require("./model/db");

const app = express();

connectDB()
// ✅ Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "hospital-food-delivery-managment-system-frontend-euuvwzm0u.vercel.app"
];

// ✅ CORS OPTIONS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// ✅ APPLY CORS FIRST
app.use(cors(corsOptions));

// ✅ PRE-FLIGHT HANDLING (IMPORTANT)
app.options("*", cors(corsOptions));

// ✅ BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROUTES
app.use("/api/v1", indexRouter);

// ✅ SAFE PORT FOR RENDER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
