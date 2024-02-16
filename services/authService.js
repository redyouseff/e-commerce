const userModel=require("../models/userModel")
const asyncHandler = require('express-async-handler')
const appError =require("../utils/apiError")
let jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");
const { parse } = require("dotenv");
const  crypto = require('crypto');
const { use } = require("../routes/user");
const {sendEmail}=require("../utils/sendMail")
const signup=asyncHandler(async(req,res,next)=>{
    const user =await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE_TIME
    })

    res.status(200).json({data:user,token:token})

})

const createToken=(payload)=>{
    const token=jwt.sign({userId:payload},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE_TIME
    })
    return token

}



const login=asyncHandler(async(req,res,next)=>{
    const user = await userModel.findOne({email: req.body.email})

    
    

    if(!user || !(await bcrypt.compare(req.body.password , user.password))){
        return next(new appError("email or password are not correct"))
    }
    

    const token= createToken(user._id)

    res.status(200).json({data:user,token:token})

})


const protect=asyncHandler(async(req,res,next)=>{
let token;

if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
    token =req.headers.authorization.split(" ")[1]
 
}

if(!token){
    return  next(new appError("you are not loged in ",400))
}

const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
const currentUser =await userModel.findById(decoded.userId)

if(!currentUser){
    return next(new appError("user is no longer exist"))
}

const passChangedTimestamp=parseInt(
    currentUser.passwordChangedAt / 1000,
    10
  );
if(passChangedTimestamp > decoded.iat){
    return next(new appError("you are recently changed your password pleace log agein "))
}

req.currentUser=currentUser;





next()
  


})



const allowedTo=(...roles)=>{
return asyncHandler(async(req,res,next)=>{
    if(!roles.includes(req.currentUser.role)){
        return next (new appError("you are not allowed to access this rout"))
    }
    next();
})}



const forgetPassword=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findOne({email: req.body.email})
   
    if(!user){
        return next (new appError(`email not found${req.body.email}` ,4004))

    }
    const resetCoder=Math.floor(Math.random() * 899999 + 100000).toString();
  

    const  hashCode =await crypto
    .createHash('md5')
    .update(resetCoder)
    .digest('hex');
     user.passwordResetCode=hashCode
     user.passwordResetExpires=Date.now() + 10 * 60 * 1000
     user.passwordResetVerified=false

     user.save();
     const message=`hi ${user.name} 
     you recieve resetcode
      ${resetCoder}`

      try{
        await sendEmail({email:user.email,
            subject:`your passwordReset valid to only 10m `,
            message:message
        })

      }
      catch(err){
        user.passwordResetCode=undefined
        user.passwordResetExpires=undefined
        user.passwordResetVerified=undefined
        user.save();
        return next(new appError("there is an error on sending an email"))
      }

    
    res.json({message:"you send an emil"})
    

   


})

const verifyResetCode=asyncHandler(async(req,res,next)=>{
    const  hashResetCode =await crypto
    .createHash('md5')
    .update(req.body.resetCode)
    .digest('hex');
    const user=await userModel.findOne({
        passwordResetCode:hashResetCode,
        passwordResetExpires:{$gt:Date.now()}

    })
    if(!user){
        return next(new appError("reset code invlaid or expire"))
    }
    user.passwordResetVerified=true;
    await user.save();
    res.status(200).json({data:"success"})


})


const resetPassword=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findOne({email:req.body.email})
    if(!user){
        return next(new appError ("no users on this email"))
    }
    if(!user.passwordResetVerified){
        return next(new appError("reset code are not verifyied"))
    }
    user.password=req.body.password
    user.passwordResetCode=undefined;
    user.passwordChangedAt=undefined;
    user.passwordResetVerified=undefined;
    await user.save();
    const token=createToken(user._id)
    res.json({token:token})

})
const test=3
module.exports={
    signup,
    login,
    protect,
    allowedTo,
    forgetPassword,
    verifyResetCode,
    resetPassword,
    test
}

