const jwt=require('jsonwebtoken')
const User=require('../models/User')
const dotenv=require('dotenv')

dotenv.config()

const authMiddleware=async (req,res,next)=>{
    const authHeader=req.headers['Authorization']

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Access Denied'})
    }
    const token=authHeader.split(' ')[1]

    try{
        const decoded=jwt.verify(token,process.env.jwt_secret)
        req.user=await User.findById(decoded.id).select('-password')
        if(!req.user){
            return res.status(404).json({message:'User not found'})
        }
        next()
    }
    catch(err){
        console.error(err.message)
        res.status(401).json({message:'Invalid Token'})
    }
}
module.exports=authMiddleware