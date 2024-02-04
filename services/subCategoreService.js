const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")
const subCategoreModel =require("../models/subCategore")
 
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


const createSubCategore=asyncHandler( async(req,res)=>{
   
    const {name,categore} =req.body
      const cat= await subCategoreModel.create({
        name:name,
        slug:slugify(name),
        categore:categore
       


    })
    
    res.status(200).send({data:cat})
    

})

const getSubCategore= asyncHandler( async(req,res)=>{
    const padge=req.query.padge |1;
    const limit =req.query.limit | 4;
    const skip =(padge - 1) * limit
   
    const categores =await subCategoreModel.find(req.filter).skip(skip).limit(limit).populate({
        path:"categore",
        select:"name -_id"
    })
    
    res.status(200).json({result:categores.length, data:categores})
    


})

const getSpecificSubCategore = asyncHandler(async(req,res,next)=>{

    const id =req.params.id;
    try{
        const categore = await subCategoreModel.findById(id);
        res.status(200).json({data:categore})
    
    }
    catch{
        return next (new appError(`not faund subcategore in id ${id}`,400))
        
    }
    
    
    
    
    
    })

    const updateSubCategore =asyncHandler(async(req,res,next)=>{
        const id =req.params.id
        const {name,categore}=req.body
       
        try{
            const cat = await subCategoreModel.findOneAndUpdate({_id:id},
                {name:name ,slug:slugify(name),categore:categore},
            {new:true})
            res.status(200).json({data:cat})
    
        }
        catch{
            return next (new appError(`not founded subcategore on ${id}`,400))
    
        }
        
       
       
    
    })


    const deleteSubCategore=asyncHandler(async(req,res,next)=>{
        const id =req.params.id
    
        try{
            const categore = await subCategoreModel.findByIdAndDelete(id)
            res.status(200).json("categore deleted")
        }
        catch{
            return next (new appError(`not founded categore on id ${id}`,400))
    
        }
        
       
    
    })
    



module.exports={createSubCategore,
getSubCategore,
getSpecificSubCategore,
updateSubCategore,
deleteSubCategore,
setCategoreIdToBody,
setFilter
}
