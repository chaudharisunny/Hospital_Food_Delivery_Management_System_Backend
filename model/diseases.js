const mongoose=require('mongoose');

const diseasesSchema=new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    diseases_Name:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:['mild','modrate','serve'],
        reuired:true
    }
   
})

module.exports=mongoose.model('Diseases',diseasesSchema)