const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")
const subCategoreModel =require("../models/subCategore")
const apiFeatures = require("../utils/apiFeatures.js")
const factory=require("./handlersFactory")

 
const setCategoreIdToBody=(req,res,next)=>{
    if(!req.body.categore){
        req.body.categore=req.params.categoreId
    }
    next();



}

const setFilter=(req,res,next)=>{
    let filter={}
    
    if(req.params.categoreId){

        filter={categore:req.params.categoreId}
      
    }
    req.filter=filter;
    next();
    
}

const createSubCategore=factory.createOne(subCategoreModel)
// const createSubCategore=asyncHandler( async(req,res)=>{
   
  
//       const cat= await subCategoreModel.create(req.body)
    
//     res.status(200).send({data:cat})
    

// })

const getSubCategore=factory.getAll(subCategoreModel)
// const getSubCategore= asyncHandler( async(req,res)=>{
//     const countDocuments=await subCategoreModel.countDocuments()
//     const queryStringObject={...req.query}
//         const Features=new apiFeatures(queryStringObject,subCategoreModel.find())

//        .paginate(countDocuments)
//        .filter()
//         .search()
//         .limitFields()
//         .sort()
//         console.log(Features.mongooseQuery)
//         const {paginationRedult,mongooseQuery}=Features
//         const product  =await mongooseQuery


//     // const padge=req.query.padge |1;
//     // const limit =req.query.limit | 4;
//     // const skip =(padge - 1) * limit
   
//     // const categores =await subCategoreModel.find(req.filter).skip(skip).limit(limit).populate({
//     //     path:"categore",
//     //     select:"name -_id"
//     // })
    
//     res.status(200).json({pagination:paginationRedult, result:product.length, data:product})
    


// })

const getSpecificSubCategore=factory.getOne(subCategoreModel)
// const getSpecificSubCategore = asyncHandler(async(req,res,next)=>{

//     const id =req.params.id;
//     try{
//         const categore = await subCategoreModel.findById(id);
//         res.status(200).json({data:categore})
    
//     }
//     catch{
//         return next (new appError(`not faund subcategore in id ${id}`,400))
        
//     }
    
    
    
    
    
//     })


    const updateSubCategore=factory.updateOne(subCategoreModel)
    // const updateSubCategore =asyncHandler(async(req,res,next)=>{
       
    //     try{
    //         const cat = await subCategoreModel.findByIdAndUpdate(req.params.id,req.body,
    //         {new:true})
    //         res.status(200).json({data:cat})
    
    //     }
    //     catch{
    //         return next (new appError(`not founded subcategore on ${id}`,400))
    
    //     }
        
       
       
    
    // })


    const deleteSubCategore=factory.deletOne(subCategoreModel)
    // const deleteSubCategore=asyncHandler(async(req,res,next)=>{
    //     const id =req.params.id
    
    //     try{
    //         const categore = await subCategoreModel.findByIdAndDelete(id)
    //         res.status(200).json("categore deleted")
    //     }
    //     catch{
    //         return next (new appError(`not founded categore on id ${id}`,400))
    
    //     }
        
       
    
    // })
    



module.exports={createSubCategore,
getSubCategore,
getSpecificSubCategore,
updateSubCategore,
deleteSubCategore,
setCategoreIdToBody,
setFilter
}
