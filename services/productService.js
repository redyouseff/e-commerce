const productModel=require("../models/productModel")
const asyncHandler = require('express-async-handler')
const slugify=require("slugify")
const appError =require("../utils/apiError")

const { query } = require("express")
const apiFeatures = require("../utils/apiFeatures")



const getProduct= asyncHandler( async(req,res)=>{
    const countDocuments=await productModel.countDocuments()
    const queryStringObject={...req.query}
        const Features=new apiFeatures(queryStringObject,productModel.find())
        // .paginate()
       .paginate(countDocuments)
       .filter()
        .search()
        .limitFields()
        .sort()
        console.log(Features.mongooseQuery)
        const {paginationRedult,mongooseQuery}=Features
        const product  =await mongooseQuery
   


 
    // const excludesFields=["padge","limit","sort","fields"]
    // excludesFields.forEach((field)=> delete queryStringObject[field])
    // let quearyString=JSON.stringify(queryStringObject);
    // quearyString=quearyString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
   

      
   
    // const padge=req.query.padge |1;
    // const limit =req.query.limit | 4;
    // const skip =(padge - 1) * limit

    // let mongooseQuery=productModel.find(JSON.parse(quearyString)).skip(skip).limit(limit).populate({
    //     path:"categore",
    //     select:"name -_id"
    // })

    // if(req.query.sort){
       
    //     const sort=req.query.sort.split(',').join(" ")
       
    //     mongooseQuery=mongooseQuery.sort(sort)


    // }

    // if(req.query.fields){
       
    //     const fields=req.query.fields.split(",").join(" ")
    //     console.log(fields)
    //     mongooseQuery=mongooseQuery.select(fields);
       
    // }
    // else{
    //     mongooseQuery=mongooseQuery.select('-_v')
    // }

    // if(req.query.keyword){
        
    //     let query = {};
    //     query.$or = [
    //         { title: { $regex: req.query.keyword, $options: 'i' } },
    //         { description: { $regex: req.query.keyword, $options: 'i' } },
    //       ];
    //     mongooseQuery=mongooseQuery.find(query)
    // }
    // const product =await mongooseQuery
    

    res.status(200).json({pagination:paginationRedult, result:product.length, data:product})
    


})

const createProduct=asyncHandler( async(req,res)=>{
    req.body.slug=slugify(req.body.title)
      const product= await  productModel.create(req.body)
    res.send({data:product})
    

})


const getSpecificProduct = asyncHandler(async(req,res,next)=>{

const id =req.params.id;
try{
    const product = await productModel.findById(id).populate({
        path:"categore",
        select:"name -_id"
    });
    res.status(200).json({data:product})

}
catch{
    return next (new appError(`not faund categore in id ${id}`,400))
    
}





})


const updateProduct =asyncHandler(async(req,res,next)=>{
    const id =req.params.id
    if(req.body.title){
        req.body.slug=slugify(req.body.title)

    }
   
   
    try{
        const product = await productModel.findOneAndUpdate({_id:id},req.body,{new:true})
        res.status(200).json({data:product})

    }
    catch{
        return next (new appError(`not founded categore on ${id}`,400))

    }
    
   
   

})

const deleteProduct=asyncHandler(async(req,res,next)=>{
    const id =req.params.id

    try{
        const product = await productModel.findByIdAndDelete(id)
        res.status(200).json("categore deleted")
    }
    catch{
        return next (new appError(`not founded categore on id ${id}`,400))

    }
    
   

})



module.exports= {
    getProduct,
    createProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,

};