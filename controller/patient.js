const Allergies = require("../model/allergies");
const Diseases = require("../model/diseases");
const Patient = require("../model/patient");
const Room = require("../model/room");

const allPatients = async (req, res) => {};

const newPatient = async (req, res) => {
  try {
    const {patient_Name,Age,Gender,Contact_Information,emergency_contact,diseases,allergies,room} = req.body;

    const newPatient=new Patient({patient_Name,Age,Gender,Contact_Information,emergency_contact,diseases,allergies,room})
    const savedPatient = await newPatient.save();

    const diseasesEntire=diseases.map(diseases=>({
      ...diseases,
      patientId:savedPatient.id,
    }))
    const savedDiseases=await Diseases.insertMany(diseasesEntire)

    const allergiesEntire=await allergies.map(allergies=>({
      ...allergies,
      patientId:savedPatient.id,
    }))
    const savedAllergies=await Allergies.insertMany(allergiesEntire)

    const roomEntries =await room.map(room => ({
      ...room,
      patientId: savedPatient._id, // Reference the patient ID
    }));
    const savedRooms = await Room.insertMany(roomEntries);


    res.status(200).json({ message: "new paitent added", 
      patient: savedPatient,
      diseases: savedDiseases,
      allergies: savedAllergies,
      rooms: savedRooms,
     });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updatePatient=async(req,res)=>{
  try {
    const{id}=req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
    res.json(updatedPatient);
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

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
