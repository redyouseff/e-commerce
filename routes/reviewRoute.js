const express =require("express")
const {  createReview,
    updateReview,
    deleteReview,
    getSpecificReview,
    getReview,
    setFilter,
    setProductIdAndUserIdToBody
}=require("../services/reviewService")
const router=express.Router({mergeParams:true});

const {  getReviewValidator,
    deleteReviewValidator,
    updateReviewValidator,
    createReviewValidator} =require("../utils/validator/reviewVlidator")

const { param, validationResult } = require('express-validator');
const{protect,allowedTo}=require("../services/authService")



router.route("/").get(setFilter,getReview)
.post(protect,allowedTo("admin","manger","user"),setProductIdAndUserIdToBody,createReviewValidator,createReview)



router.route("/:id").get(getSpecificReview)

.put(protect,allowedTo("admin","manger","user"),updateReviewValidator,updateReview)

.delete(protect,allowedTo("admin","user"),deleteReviewValidator,deleteReview)

;



module.exports=router;