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
app.use(cors())
// const serverless = require('serverless-http');
app.use('/api/v1/',indexRouter)
app.listen(port,()=>{
    console.log(`server connected to ${port}`);   
})
// module.exports.handler = serverless(app);