const mongoose=require('mongoose');

const pantrySchema=new mongoose.Schema({
    staffName: String,
    contactInfo: String,
    location: String,
    tasks: [
        {
            taskType: { type: String, enum: ['Preparation', 'Delivery'] },
            mealType: { type: String, enum: ['Morning', 'Evening', 'Night'] },
            status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
        }
    ]
})

module.exports=mongoose.model('Pantry',pantrySchema)

