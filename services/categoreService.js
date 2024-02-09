const categoreModel=require("../models/categoremodel")
const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const factory=require("./handlersFactory")
const {uploadSingleImage}=require("../middleware/uploadImage")



const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const sharp =require("sharp")



// const multerStorage= multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/categore")       
//     },
//     filename:(req,file,cb)=>{
       
//         const ext=file.mimetype.split("/")[1]
//         const filename =`categore-${uuidv4()}-${Date.now()}.${ext}`

//         cb(null,filename)

//     }
// })

// const multerStorage=multer.memoryStorage(); 

// const multerFilter=(req,file,cb)=>{
//      if(file.mimetype.startsWith("image")){
//         cb(null,true)
//     }
//     else{
//         cb(new appError("only imaged allowed",400),false)
//     }
// }

// const upload=multer({ storage : multerStorage  ,fileFilter:multerFilter})

const uploadCategoreImage=uploadSingleImage("image")

const reasizeImage=asyncHandler( async (req,res,next)=>{
    const fileName=`categore-${uuidv4()}-${Date.now()}.jpeg`
    sharp(req.file.buffer).resize(600,600)
    .toFormat("jpeg")
    .jpeg({quality:90})
    .toFile(`uploads/categore/${fileName}`)
    req.body.image=fileName;
    next();




})

const getCategore=factory.getAll(categoreModel)

// const getCategore= asyncHandler( async(req,res)=>{

//     const countDocuments=await categoreModel.countDocuments()
//     const queryStringObject={...req.query}
//         const Features=new apiFeatures(queryStringObject,categoreModel.find())

//        .paginate(countDocuments)
//        .filter()
//         .search()
//         .limitFields()
//         .sort()
//         const {paginationRedult,mongooseQuery}=Features
//         const product  =await mongooseQuery

//     // const padge=req.query.padge |1;
//     // const limit =req.query.limit | 4;
//     // const skip =(padge - 1) * limit
//     // const categores =await categoreModel.find({}).skip(skip).limit(limit)
    
//     res.status(200).json({pagination:paginationRedult,result:product.length, data:product})
    


// })


const createCategore=factory.createOne(categoreModel)
// const createCategore=asyncHandler( async(req,res)=>{
//     const name =req.body.name
//       const categore= await categoreModel.create({
//         name:name,
//         slug:slugify(name),
       


//     })
//     res.send({data:categore})
    

// })


const getSpecificCategore=factory.getOne(categoreModel)

// const getSpecificCategore = asyncHandler(async(req,res,next)=>{

// const id =req.params.id;
// try{
//     const categore = await categoreModel.findById(id);
//     res.status(200).json({data:categore})

// }
// catch{
//     return next (new appError(`not faund categore in id ${id}`,400))
    
// }





// })



const updateCategore=factory.updateOne(categoreModel)
// const updateCategore =asyncHandler(async(req,res,next)=>{
//     const id =req.params.id
//     const name=req.body.name
   
//     try{
//         const categore = await categoreModel.findOneAndUpdate({_id:id},{name:name ,slug:slugify(name)},{new:true})
//         res.status(200).json({data:categore})

//     }
//     catch{
//         return next (new appError(`not founded categore on ${id}`,400))

//     }
    
   
   

// })


const deleteCategore=factory.deletOne(categoreModel)
// const deleteCategore=asyncHandler(async(req,res,next)=>{
//     const id =req.params.id

//     try{
//         const categore = await categoreModel.findByIdAndDelete(id)
//         res.status(200).json("categore deleted")
//     }
//     catch{
//         return next (new appError(`not founded categore on id ${id}`,400))

//     }
    
   

// })



module.exports= {getCategore,
    createCategore,
    getSpecificCategore,
    updateCategore,
    deleteCategore,
    uploadCategoreImage,
    reasizeImage,

    

};