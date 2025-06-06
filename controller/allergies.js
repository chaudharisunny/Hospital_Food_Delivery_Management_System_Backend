const allergies=require('../model/allergies')

const allData=async(req,res)=>{
  try {
    const result=await allergies.find()
    res.status(200).json({data:result})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'server error',error:error.message})
  }
}

const postAllergies=async(req,res)=>{
  try {
    const{allergies_Name}=req.body
    if(!allergies_Name){
      return res.status(401).json({message:'all fields are required'})
    }
    const new_Data=await allergies.create({allergies_Name})
    return res.status(201).json({result:new_Data})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'server error'})
  }
}

const updateAllergies=async(req,res)=>{
  try {

    const{id}=req.params

    if(!id){
      return res.status(402).json({message:'id is not found'})
    }
    const{allergies_Name}=req.body

    const update_Result=await allergies.findByIdAndUpdate(id,{allergies_Name},{new:true})
    return res.status(200).json({result:update_Result})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'server error'})
  }
}

const deleteAllergies=async(req,res)=>{
  try {
    const {id}=req.params
    if(!id){
      return res.status(401).json({message:'id is not found'})
    }
    const result=await allergies.findByIdAndDelete(id)
    return res.status(200).json({message:'this data deleted'})
  } catch (error) {
    console.log(error)
  }
}

module.exports={allData,postAllergies,updateAllergies,deleteAllergies}