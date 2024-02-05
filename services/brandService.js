const brandModel=require("../models/brandModel")
const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const factory=require("./handlersFactory")

const getBrand=factory.getAll(brandModel)

// const getBrand= asyncHandler( async(req,res)=>{

//     const countDocuments=await brandModel.countDocuments()
//     const queryStringObject={...req.query}
//         const Features=new apiFeatures(queryStringObject,brandModel.find())

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
//     // const brand =await brandModel.find({}).skip(skip).limit(limit)
    
//     res.status(200).json({pagination:paginationRedult,result:product.length, data:product})
    


// })

const createBrand=factory.createOne(brandModel)
// const createBrand=asyncHandler( async(req,res)=>{
//     const name =req.body.name
//       const brand= await brandModel.create({
//         name:name,
//         slug:slugify(name),
       


//     })
//     res.send({data:brand})
    

// })


const getSpecificBrand=factory.getOne(brandModel)
// const getSpecificBrand = asyncHandler(async(req,res,next)=>{

// const id =req.params.id;
// try{
//     const brand = await brandModel.findById(id);
//     res.status(200).json({data:brand})

// }
// catch{
//     return next (new appError(`not faund brand in id ${id}`,400))
    
// }





// })

const updateBrand =factory.updateOne(brandModel)
// const updateBrand =asyncHandler(async(req,res,next)=>{
//     const id =req.params.id
//     const name=req.body.name
   
//     try{
//         const brand = await brandModel.findOneAndUpdate({_id:id},{name:name ,slug:slugify(name)},{new:true})
//         res.status(200).json({data:brand})

//     }
//     catch{
//         return next (new appError(`not founded brand on ${id}`,400))

//     }
    
   
   

// })

const deleteBrand=factory.deletOne(brandModel);





module.exports= {
   createBrand,
   updateBrand,
   deleteBrand,
   getSpecificBrand,
   getBrand,


};