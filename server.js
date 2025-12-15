require('dotenv').config()
const express=require('express');
const app=express()
const port=process.env.PORT
const bodyPrser=require('body-parser')
const indexRouter=require('./router/index')
const db=require('./model/db')
const cors=require('cors')
app.use(bodyPrser.urlencoded({extended:true}))
app.use(express.json())

const allowedOrigins = [
  "http://localhost:5173",               // local frontend
  "https://hospital-food-delivery-managment-sy.vercel.app/"     // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use('/api/v1/',indexRouter)
app.listen(port,()=>{
    console.log(`server connected to ${port}`);   
})
