require('dotenv').config()
const JWT=require('jsonwebtoken')


const createToken=(user)=>{
    const payload={
        userId:user._id,
        email:user.email,
        username:user.username,
        role:user.role
    }

   return JWT.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'}) 
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = JWT.verify(token,process.env.JWT_SECRET); // ✅ correct usage
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


module.exports={createToken,verifyToken}