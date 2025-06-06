const diseases = require("../model/diseases");

const allDisease=async(req,res)=>{
    try {
        const allDisease=await diseases.find();
        return res.status(200).json({result:allDisease})
    } catch (error) {
        console.log(error);
        res.status(500).json('server error')
    }
}
const newDiseases = async (req, res) => {
  try {
    const { diseases_Name,severity } = req.body;

    if (!diseases_Name,!severity) {
      return res.status(401).json({ message: "all field are required" });
    }
    const new_diseases = await diseases.create({ diseases_Name,severity });
    return res.status(201).json({ result: new_diseases });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const updateDiseases=async(req,res)=>{
    try {
        const{id}=req.params;
        const{diseases_Name,severity}=req.body
        if(!id){
            return res.status(402).json({message:'id is not found'})
        }
        const update_Result=await diseases.findByIdAndUpdate(id,{diseases_Name,severity},{new:true})
        return res.status(200).json({message:'diseases are update',data:update_Result})
    } catch (error) {
        console.log(error);
        res.status(500).json('server error',{error:error.message})
        
    }
}

const deleteDiseases=async(req,res)=>{
    try {
        const{id}=req.params;
        if(!id){
            return res.status(402).json({message:'id is not found'})
        }
        const delete_result=await diseases.findByIdAndDelete(id)
        return res.status(200).json({message:'deleted diseases',data:delete_result})
    } catch (error) {
        console.log(error);
        res.status(500).json('server error',{error:error.message}) 
    }
}
module.exports = {allDisease,newDiseases,updateDiseases,deleteDiseases };
