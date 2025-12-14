const pantry=require('../model/pantry');

const allPantry=async(req,res)=>{
  try {
    const all_Data=await pantry.find()
    return res.status(200).json({result:all_Data})
  } catch (error) {
    res.status(500).json({message:'server error'})
  }
}

const createPantry=async(req,res)=>{
  try {
      
      const new_Data=await  pantry.create(req.body)
      return res.status(201).json({result:new_Data})
    } catch (error) {
      console.log(error);
      res.status(500).json({message:'server error'})
    }
  }

  const updatePantry=async(req,res)=>{
    try {
       
        const update_Data=await pantry.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!update_Data){
          return res.status(404).json({message:'id is not found'})
        }
        return res.status(201).json({result:update_Data})
      } catch (error) {
        console.log(error);
        res.status(500).json({message:'server error'})
      }
    }
const getPantryById = async (req, res) => {
  try {
    const fonundPantry = await pantry.findById(req.params.id);
    if (!fonundPantry) {
      return res.status(404).json({ message: 'Pantry not found' });
    }
    res.status(200).json({ result: fonundPantry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

    const deletePantry=async(req,res)=>{
      try {
         
          const delete_Data=await pantry.findByIdAndDelete(req.params.id)
          if(!delete_Data){
            return res.status(404).json({message:'id is not found'})
          }
          return res.status(201).json({result:delete_Data})
        } catch (error) {
          console.log(error);
          res.status(500).json({message:'server error'})
        }
      }

module.exports={allPantry,createPantry,updatePantry,getPantryById,deletePantry}
