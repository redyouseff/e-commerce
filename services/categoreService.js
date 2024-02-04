const categoreModel=require("../models/categoremodel")
const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")


const getCategore= asyncHandler( async(req,res)=>{
    const padge=req.query.padge |1;
    const limit =req.query.limit | 4;
    const skip =(padge - 1) * limit
    const categores =await categoreModel.find({}).skip(skip).limit(limit)
    
    res.status(200).json({result:categores.length, data:categores})
    


})

const createCategore=asyncHandler( async(req,res)=>{
    const name =req.body.name
      const categore= await categoreModel.create({
        name:name,
        slug:slugify(name),
       


    })
    res.send({data:categore})
    

})


const getSpecificCategore = asyncHandler(async(req,res,next)=>{

const id =req.params.id;
try{
    const categore = await categoreModel.findById(id);
    res.status(200).json({data:categore})

}
catch{
    return next (new appError(`not faund categore in id ${id}`,400))
    
}





})


const updateCategore =asyncHandler(async(req,res,next)=>{
    const id =req.params.id
    const name=req.body.name
   
    try{
        const categore = await categoreModel.findOneAndUpdate({_id:id},{name:name ,slug:slugify(name)},{new:true})
        res.status(200).json({data:categore})

    }
    catch{
        return next (new appError(`not founded categore on ${id}`,400))

    }
    
   
   

})

const deleteCategore=asyncHandler(async(req,res,next)=>{
    const id =req.params.id

    try{
        const categore = await categoreModel.findByIdAndDelete(id)
        res.status(200).json("categore deleted")
    }
    catch{
        return next (new appError(`not founded categore on id ${id}`,400))

    }
    
   

})



module.exports= {getCategore,
    createCategore,
    getSpecificCategore,
    updateCategore,
    deleteCategore

};