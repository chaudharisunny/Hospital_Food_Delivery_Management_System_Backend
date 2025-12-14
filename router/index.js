const express=require('express');
const router=express.Router()

const diseasesController=require('../controller/diseases')
const allergiesController=require('../controller/allergies')
const roomController=require('../controller/room')
const patientController=require('../controller/patient')
const mealplanController=require('../controller/mealplan')
const pantryController=require('../controller/pantry')
const AdminController=require('../controller/Admin');
const DoctorController=require('../controller/doctor')
const { verifyToken } = require('../Middleware/verifyToken');


router.get('/index',verifyToken,async(req,res)=>{
    res.status(200).json({message:'welcome to HFDM dashboard...'})
})

router.post('/adminSignup',AdminController.AdminSignup)
router.post('/adminLogin',AdminController.AdminLogin)
router.get('/allAdmin',AdminController.AllAdmin)
router.post('/logout',AdminController.logout)
router.get('/profile',AdminController.getProfile)
router.put('/update-profile/:id',AdminController.updateProfile)

router.get('/all_diseases',diseasesController.allDisease)
router.post('/add_diseases',diseasesController.newDiseases)
router.put('/update_diseases/:id',diseasesController.updateDiseases)
router.delete('/delete_diseases/:id',diseasesController.deleteDiseases)

router.get('/all_allergies',allergiesController.allData)
router.post('/add_allergies',allergiesController.postAllergies)
router.put('/update_allergies/:id',allergiesController.updateAllergies)
router.delete('/delete_allergies/:id',allergiesController.deleteAllergies)

router.get('/all_rooms',roomController.all_room)
router.post('/new_room',roomController.new_Room)
router.put('/update_room/:id',roomController.update_Room)
router.get('/room/:id',roomController.getSingleRoom)
router.delete('/delete_room/:id',roomController.delete_Room)

router.get('/patients',patientController.allPatients)
router.post('/new_patient',patientController.newPatient)
router.put('/update_patient/:id',patientController.updatePatient)
router.delete('/delete_patient/:id',patientController.deletePatient)

router.get('/specializations',DoctorController.allSpecialization)
router.post('/add-specializations',DoctorController.createSpecializations)

router.get('/allMealPlan',mealplanController.allMealPlan)
router.post('/newMealPlan',mealplanController.createMealPlan)
router.put('/updateMealPlan/:id',mealplanController.updateMealPlan)
router.get('/mealplan/:id', mealplanController.getMealPlanById);
router.delete('/deleteMealPlan/:id',mealplanController.deleteMealPlan)

router.get('/allpantry',pantryController.allPantry)
router.post('/newpantry',pantryController.createPantry)
router.put('/updatepantry/:id',pantryController.updatePantry)
router.get('/pantry/:id',pantryController.getPantryById)
router.delete('/deletepantry/:id',pantryController.deletePantry)

module.exports=router