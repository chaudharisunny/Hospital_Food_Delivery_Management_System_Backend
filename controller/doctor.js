const specialization=require('../model/specializations')

const allSpecialization=async(req,res)=>{
    try {
        const allData=await specialization.find().sort({ name: 1 });
        return res.status(200).json({message:allData})
    } catch (error) {
          res.status(201).json({result:newData})
    }
}
const createSpecializations=async(req,res)=>{
    try {
        const{specializations_Name}=req.body;
        if(!specializations_Name){
            return res.status(400).json({error:'this field is required..!'}) 
        }
        const newData=await specialization.create({specializations_Name})
            return res.status(201).json({result:newData})        

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'server error'})
    }
}

module.exports={createSpecializations,allSpecialization}