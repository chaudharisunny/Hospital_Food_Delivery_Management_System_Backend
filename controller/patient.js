const Allergies = require("../model/allergies");
const Diseases = require("../model/diseases");
const Patient = require("../model/patient");
const Room = require("../model/room");

const allPatients = async (req, res) => {
  try {
    const allPatient=await Patient.find()
    return res.status(200).json({data:allPatient})
  } catch (error) {
    res.status(500).json({error:'server error'})
  }
};

const newPatient = async (req, res) => {
  try {
    const {patient_Name,Age,Gender,Contact_Information,emergency_contact} = req.body;

    const newPatient= new Patient({patient_Name,Age,Gender,Contact_Information,emergency_contact})
    const savedPatient = await newPatient.save();

   

    res.status(200).json({ message: "new paitent added", 
      patient: savedPatient,
     });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_Name, Age, Gender, Contact_Information, emergency_contact } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { patient_Name, Age, Gender, Contact_Information, emergency_contact },
      { new: true }
    );

    if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deletePatient=async(req,res)=>{
  try{
    const{id}=req.params
    const deletePatient=await Patient.findByIdAndDelete(id);
    if(!deletePatient) return res.status(404).json({message:'patient not found'});
    res.json(deletePatient)
  }catch(error){
    res.status(400).json({error:error.message})
  }
}
module.exports = { allPatients, newPatient,updatePatient ,deletePatient};
