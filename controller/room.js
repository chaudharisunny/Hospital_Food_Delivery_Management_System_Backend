const Room = require("../model/room")


const all_room=async(req,res)=>{
    try {
        const result=await Room.find(req.params.id).populate('patientId','patient_Name')
        return res.status(200).json({data:result})
    } catch (error) {
        res.status(500).json({message:'server error',error:error.message})
    }
}

const new_Room=async(req,res)=>{
try {
    const{patientId,room_Number,bed_Number,floor_Number}=req.body;
    if(!  patientId||!room_Number||!bed_Number||!floor_Number){
        return res.status(401).json({message:'all field are required'})
    }
    const result=await Room.create({patientId,room_Number,bed_Number,floor_Number})
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
        const update_result=await Room.findByIdAndUpdate(id,{room_Number,bed_Number,floor_Number},{new:true});
        return res.status(200).json({message:'updated Data',data:update_result})
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}

const getSingleRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate('patientId', 'patient_Name');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.status(200).json({data:room});
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const delete_Room=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({message:'id is not found'})
        }
        const result=await Room.findByIdAndDelete(id)
        return res.status(200).json({message:'this data deleted',data:result})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error:error.message})
    }
}

module.exports={all_room,new_Room,update_Room,getSingleRoom,delete_Room}