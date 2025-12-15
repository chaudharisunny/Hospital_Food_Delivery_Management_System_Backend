const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// const mongoose=require('mongoose');
// require('dotenv').config()
// mongoose.connect(process.env.MONGO_URI).then(()=>{
//     console.log('database connect');
    
// }).catch((error)=>{
//     console.log(error);
    
// })

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error('MONGO_URI is not defined');
//     }

//     console.log('Connecting to MongoDB...');
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected successfully');

//   } catch (error) {
//     console.error('MongoDB connection failed ❌');
//     console.error(error.message);
//     throw error; // important
//   }
// };

// module.exports = connectDB;
