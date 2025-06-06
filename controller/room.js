const rooms=require('../model/room');

const all_room=async(req,res)=>{
    try {
        const result=await rooms.find()
        return res.status(200).json({data:result})
    } catch (error) {
        res.status(500).json({message:'server error',error:error.message})
    }
}

const new_Room=async(req,res)=>{
try {
    const{room_Number,bed_Number,floor_Number}=req.body;
    if(!room_Number||!bed_Number||!floor_Number){
        return res.status(401).json({message:'all field are required'})
    }
    const result=await rooms.create({room_Number,bed_Number,floor_Number})
    return res.status(201).json({data:result})
} catch (error) {
    res.status(500).json({message:"server error"})
}
}

const update_Room=async(req,res)=>{
    try {
        const{id}=req.params;
        if(!id){
            return res.status(400).json({message:'id is not found'})
        }
        const{room_Number,bed_Number,floor_Number}=req.body;
        const update_result=await rooms.findByIdAndUpdate(id,{room_Number,bed_Number,floor_Number},{new:true});
        return res.status(200).json({message:'updated Data',data:update_result})
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}

const delete_Room=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({message:'id is not found'})
        }
        const result=await rooms.findByIdAndDelete(id)
        return res.status(200).json({message:'this data deleted',data:result})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error:error.message})
    }
}

module.exports={all_room,new_Room,update_Room,delete_Room}