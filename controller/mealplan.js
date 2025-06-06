const mealPlan=require('../model/meal_plan');

const allMealPlan=async(req,res)=>{
  try {
    const all_Data=await mealPlan.find()
    return res.status(200).json({result:all_Data})
  } catch (error) {
    res.status(500).json({message:'server error'})
  }
}

const createMealPlan=async(req,res)=>{
  try {
      
      const new_Data=await  mealPlan.create(req.body)
      return res.status(201).json({result:new_Data})
    } catch (error) {
      console.log(error);
      res.status(500).json({message:'server error'})
    }
  }

  const updateMealPlan=async(req,res)=>{
    try {
       
        const update_Data=await mealPlan.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!update_Data){
          return res.status(404).json({message:'id is not found'})
        }
        return res.status(201).json({result:update_Data})
      } catch (error) {
        console.log(error);
        res.status(500).json({message:'server error'})
      }
    }

    const deleteMealPlan=async(req,res)=>{
      try {
         
          const delete_Data=await mealPlan.findByIdAndDelete(req.params.id)
          if(!delete_Data){
            return res.status(404).json({message:'id is not found'})
          }
          return res.status(201).json({result:delete_Data})
        } catch (error) {
          console.log(error);
          res.status(500).json({message:'server error'})
        }
      }

module.exports={allMealPlan,createMealPlan,updateMealPlan,deleteMealPlan}