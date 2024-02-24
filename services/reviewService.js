const reviewModel=require("../models/reviewModel")
const asyncHandler = require('express-async-handler')
const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const factory=require("./handlersFactory")
const { model } = require("mongoose")






const setFilter=(req,res,next)=>{
   let filter={}
   
   if(req.params.productId){

       filter={product:req.params.productId}
     
   }
   req.filterObj=filter;
   next();
   
}

const setProductIdAndUserIdToBody=(req,res,next)=>{
   if(!req.body.user){
       req.body.user=req.currentUser._id
   }
   if(!req.body.product){
      req.body.product=req.params.productId
   }
   next();



}

const getReview=factory.getAll(reviewModel)





const createReview=factory.createOne(reviewModel)



const getSpecificReview=factory.getOne(reviewModel)








const updateReview =factory.updateOne(reviewModel)


const deleteReview=factory.deletOne(reviewModel);






module.exports= {
   createReview,
   updateReview,
   deleteReview,
   getSpecificReview,
   getReview,
   setFilter,
   setProductIdAndUserIdToBody
  
};