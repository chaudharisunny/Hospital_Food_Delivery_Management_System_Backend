const mongoose=require('mongoose');

const mealPlanSchema=new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    morning: {
        meal: String,
        ingredients: [String],
        instructions: String
    },
    evening: {
        meal: String,
        ingredients: [String],
        instructions: String
    },
    night: {
        meal: String,
        ingredients: [String],
        instructions: String
    }
   
},{timestamps:true})

module.exports=mongoose.model('MealPlan',mealPlanSchema)
