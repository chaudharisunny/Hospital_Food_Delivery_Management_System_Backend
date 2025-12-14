const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    patientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Patient'
        },
    room_Number:{
        type:String,
        required:true
    },
    bed_Number:{
        type:String,
        required:true
    },
    floor_Number:{
        type:String,
        required:true
    },
   
})
    
module.exports=mongoose.model('Room',roomSchema)