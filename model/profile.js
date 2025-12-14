const mongoose=require('mongoose')

const profileSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true 
    },
    role:{
        type:String, 
        enum:['admin','doctor','nutrtition','kitchen_staff'],
        required:true 
    },
    specializations:{
        type:String,
        required:function(){
            return this.role==='doctor'
        }
    },
    contactno:{
        type:String,
        required:true 
    }
},{timestamps:true})

module.exports=mongoose.model('profile',profileSchema)