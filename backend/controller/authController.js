const bcrypt=require('bcrypt.js')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const dotenv=require('dotenv')

dotenv.config()

exports.register=async (req,res)=>{
    const {username,email,password}=req.body;

    try{
        let user=await User.findOne({email});
        if(user) return res.status(400).json({message:'User Already Exists'});

        user=new User({username,email,password});

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save()

        const payload={id:user._id}
        const token=jwt.sign(payload,process.env.JWT_SECRET,{  expiresIn:'1h'});
        res.status(201).json({token,user:{id:user._id,username,email}})

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:'Server Error'})
    }
}

exports.login=async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email})
        if(!user)return res.status(400).json({message:'Invalid Credentials'})
        
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)return res.status(400).json({message:'Invalid Credentials'})
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.json({ token, user: { id: user._id, username: user.username, email } });
    }
    catch(Error){
        console.log(Error.message)
        res.status(500).json({message:'Server error'})
    }
}