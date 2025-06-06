const mongoose=require('mongoose');

const allergiesSchema=new mongoose.Schema({
     patientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Patient'
        },
    allergies_Name:{
        type:String,
        required:true
    },
   
})

module.exports=mongoose.model('Allergies',allergiesSchema)