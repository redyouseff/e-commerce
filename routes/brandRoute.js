const express =require("express")
const {createBrand, updateBrand,deleteBrand,getSpecificBrand, getBrand,uploadBrandImage,reasizeImage}=require("../services/brandService")
const router=express.Router();
const { getbrandValidator,deletebrandValidator,updatebrandValidator, createbrandValidator} =require("../utils/validator/brandVlidator")
const { param, validationResult } = require('express-validator');



router.route("/").get(getBrand)
.post(uploadBrandImage,reasizeImage,createbrandValidator,createBrand)

router.route("/:id").get(getbrandValidator,getSpecificBrand)

.put(uploadBrandImage,reasizeImage,updatebrandValidator,updateBrand)

.delete(deletebrandValidator,deleteBrand)

;



module.exports=router;