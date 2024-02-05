const categoreModel=require("../models/categoremodel")
const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const factory=require("./handlersFactory")


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
    deleteCategore

};