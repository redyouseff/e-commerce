const express =require("express")
const {createBrand, updateBrand,deleteBrand,getSpecificBrand, getBrand,uploadBrandImage,reasizeImage}=require("../services/brandService")
const router=express.Router();
const { getbrandValidator,deletebrandValidator,updatebrandValidator, createbrandValidator} =require("../utils/validator/brandVlidator")
const { param, validationResult } = require('express-validator');
const{protect,allowedTo}=require("../services/authService")



router.route("/").get(getBrand)
.post(protect,allowedTo("admin","manger"),uploadBrandImage,reasizeImage,createbrandValidator,createBrand)

router.route("/:id").get(getbrandValidator,getSpecificBrand)

.put(protect,allowedTo("admin","manger"),uploadBrandImage,reasizeImage,updatebrandValidator,updateBrand)

.delete(protect,allowedTo("admin"),deletebrandValidator,deleteBrand)

;



module.exports=router;