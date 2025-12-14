const { createToken } = require("../Middleware/CreateToken");
const admin = require("../model/Admin");
const { findByIdAndUpdate } = require("../model/diseases");
const Profile=require('../model/profile')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const AdminSignup = async (req, res) => {
  try {
    const { username, email, password, role, contactno, specialization } = req.body;

    // Allowed roles
    if (!['admin', 'doctor', 'nutritionist', 'kitchen_staff'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if email already exists
    const existingUser = await admin.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists!" });
    }

    // Create new admin object
    const newAdminData = {
      username,
      email,
      password, // will be hashed in model pre-save middleware
      role,
      contactno,
      specialization // now for all roles, optional
    };

    const newAdmin = await admin.create(newAdminData);

    return res.status(201).json({
      message: "Signup successful! Please log in.",
      result: {
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
        contactno: newAdmin.contactno,
        specialization: newAdmin.specialization
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};



const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const user = await admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken(user);
    return res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

 
const AllAdmin=async(req,res)=>{
  try {
  const result=await admin.find()
  return res.status(200).json({data:result})  
  } catch (error) {
    res.status(500).json({error:'server error'})
  }
  
}

const logout=(req,res)=>{
    res.clearCookie('token')
    res.status(201).json({message:"logout user"})
}

const getProfile=async(req,res)=>{
  try {
    const {id}=req.params
    if(!id){
      return res.status(400).json({error:'id is not found'})
    }

    const showProfile=await admin.findById(id)
    return res.status(200).json({result:showProfile})
  } catch (error) {
     res.status(500).json({error:'server error'})
  }
}

const updateProfile=async(req,res)=>{
  try {
    const {id}=req.params 
    if(!id){
      return res.status(400).json({error:'id is not found'})
    }
    const {username,email,password,role,contactus,specialization}=req.body 
    const editProfile=await admin.findByIdAndUpdate(id,
      username,email,password,role,contactus,specialization,  
       {new:true})

    return res.status(200).json({result:editProfile})

  } catch (error) {
     res.status(500).json({error:'server error'})
  }
    
}
module.exports = { AdminSignup, AdminLogin,logout,AllAdmin,updateProfile,getProfile};
