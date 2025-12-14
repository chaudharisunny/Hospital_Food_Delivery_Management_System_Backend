const mongoose=require('mongoose');

const specializationsSchema=new mongoose.Schema({
     
    specializations_Name:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model('Specializations',specializationsSchema)