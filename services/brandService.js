const brandModel=require("../models/brandModel")
const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")


const getBrand= asyncHandler( async(req,res)=>{
    const padge=req.query.padge |1;
    const limit =req.query.limit | 4;
    const skip =(padge - 1) * limit
    const brand =await brandModel.find({}).skip(skip).limit(limit)
    
    res.status(200).json({result:brand.length, data:brand})
    


})

const createBrand=asyncHandler( async(req,res)=>{
    const name =req.body.name
      const brand= await brandModel.create({
        name:name,
        slug:slugify(name),
       


    })
    res.send({data:brand})
    

})


const getSpecificBrand = asyncHandler(async(req,res,next)=>{

const id =req.params.id;
try{
    const brand = await brandModel.findById(id);
    res.status(200).json({data:brand})

}
catch{
    return next (new appError(`not faund brand in id ${id}`,400))
    
}





})


const updateBrand =asyncHandler(async(req,res,next)=>{
    const id =req.params.id
    const name=req.body.name
   
    try{
        const brand = await brandModel.findOneAndUpdate({_id:id},{name:name ,slug:slugify(name)},{new:true})
        res.status(200).json({data:brand})

    }
    catch{
        return next (new appError(`not founded brand on ${id}`,400))

    }
    
   
   

})

const deleteBrand=asyncHandler(async(req,res,next)=>{
    const id =req.params.id

    try{
        const brand = await brandModel.findByIdAndDelete(id)
        res.status(200).json("brand deleted")
    }
    catch{
        return next (new appError(`not founded brand on id ${id}`,400))

    }
    
   

})



module.exports= {
   createBrand,
   updateBrand,
   deleteBrand,
   getSpecificBrand,
   getBrand,


};