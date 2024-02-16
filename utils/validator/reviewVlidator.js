const validator=require("../../middleware/validator")
const { check,body } = require('express-validator');
const reviewModel =require("../../models/reviewModel");
const { promises } = require("nodemailer/lib/xoauth2");
const appError = require("../apiError");
const { test } = require("../../services/authService");

const getReviewValidator=[check("id").isMongoId().withMessage("invalid Review id"),validator

]

const createReviewValidator=[check("title").notEmpty().withMessage('required'),
check("rating").notEmpty().withMessage("rating cant be embty") 
.isFloat({min:1,max:5}).withMessage("reting value is from 1 to 5"),
check("user").isMongoId().withMessage("invalid format to user"),
check("product").isMongoId().withMessage("invalid format of product")
.custom((val, { req }) =>

reviewModel.findOne({ user: req.currentUser._id, product: req.body.product }).then(
  (review) => {
  
    if (review) {
      return Promise.reject(
        new Error('You already created a review before')
      );
    }
  }
)
)

,
validator

]
const deleteReviewValidator=[check("id").isMongoId().withMessage("invalid Review id")
.custom((val,{ req })=>{

    if(req.currentUser.role=="user"){
        return  reviewModel.findById(val).then((review)=>{
            
            if(!review){
                return Promise.reject(new Error("their is no no review on this id "))
            }
            if(req.currentUser._id.toString()!=review.user._id){
                return Promise.reject(new Error("you allowed remove only your review"))
            }
        })
    }
    return true;
 
})



,validator

]
const updateReviewValidator=[
    check("id").isMongoId().withMessage("invalid Review id")
    .custom((val,{req})=>
        reviewModel.findById(val).then((review)=>{
            if(!review){
                return Promise.reject(new Error("no review by this id "))
            }
       
            if(req.currentUser._id.toString()!=review.user._id.toString()){
                return Promise.reject(new Error("it is not your commit "))

                
            }
        })
     
    )

    ,validator


]



module.exports={
    getReviewValidator,
    deleteReviewValidator,
    updateReviewValidator,
    createReviewValidator
}
    
