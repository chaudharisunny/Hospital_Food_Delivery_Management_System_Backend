const mongoose=require('mongoose');

const patientSchema=new mongoose.Schema({
    patient_Name:{
        type:String,
        required:true
    },
    Age:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        enum:['male','female','other'],
        required:true
    },
    Contact_Information:{
        type:String,
        required:true
    },
    emergency_contact:{
        type:String,
       
    }
    
},{timestamps:true})

module.exports=mongoose.model('Patient',patientSchema)