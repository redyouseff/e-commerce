const userModel=require("../models/userModel")
const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const factory=require("./handlersFactory")
const {uploadSingleImage}=require("../middleware/uploadImage")
const bcrypt=require('bcrypt')
const createToken=require("../utils/createToken")

const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const sharp =require("sharp")

const getUser=factory.getAll(userModel)



const uploadImage=uploadSingleImage("profileImage")
const reasizeImage=asyncHandler( async (req,res,next)=>{
   const fileName=`user-${uuidv4()}-${Date.now()}.jpeg`
   sharp(req.file.buffer).resize(600,600)
   .toFormat("jpeg")
   .jpeg({quality:90})
   .toFile(`uploads/user/${fileName}`)
   req.body.profileImage=fileName;
   next();




})


const createUser=factory.createOne(userModel)



const getSpecificUser=factory.getOne(userModel)







const updateUser =asyncHandler(async(req,res,next)=>{
       
    try{
        const cat = await userModel.findByIdAndUpdate(req.params.id,{

            name:req.body.name,
            email:req.body.email,
            slug:req.body.slug,
            phone:req.body.phone,
            role:req.body.role

        },
        {new:true})
        res.status(200).json({data:cat})

    }
    catch{
        return next (new appError(`not founded subcategore on ${req.params.id}`,400))

    }
    
   
   

})
const changePassword=asyncHandler(async(req,res,next)=>{
    
       
    try{
        const cat = await userModel.findByIdAndUpdate(req.params.id,{

            password:await bcrypt.hash(req.body.password,12),
            passwordChangedAt: Date.now()
        },
        {new:true})
        res.status(200).json({data:cat})

    }
    catch{
        return next (new appError(`not founded user on ${req.params.id}`,400))

    }
    
   
   

})

const deleteUser=factory.deletOne(userModel)

const getLoggedUser=asyncHandler(async(req,res,next)=>{
   
    req.params.id=req.currentUser._id
    next()


})
const updateLoggedUserPassword=asyncHandler(async(req,res,next)=>{
    
    const user =await userModel.findByIdAndUpdate(req.currentUser._id,{
        password:await bcrypt.hash(req.body.password,12),
        passwordChangedAt:Date.now(),
    },{
        new:true
    }
    )
   
    const token= createToken(req.currentUser._id)

    res.json({data:user,token})


})

const updateLoggedUserData=asyncHandler(async(req,res,next)=>{
   
    const user =await userModel.findByIdAndUpdate(req.currentUser._id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone

    },
    {
        new:true
    })
    console.log(user)
    

    res.json({data:user})


})

const deleteLoggedUserData=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findByIdAndUpdate(req.currentUser._id,{
        active:false
    })
    res.status(200).json({status:"success"})
})





module.exports= {
   createUser,
   updateUser,
   deleteUser,
   getSpecificUser,
   getUser,
   uploadImage,
   reasizeImage,
   changePassword,
   getLoggedUser,
   updateLoggedUserPassword,
   updateLoggedUserData,
   deleteLoggedUserData



};