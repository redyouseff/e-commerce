const express =require("express")
const {createBrand, updateBrand,deleteBrand,getSpecificBrand, getBrand,}=require("../services/brandService")
const router=express.Router();
const { getbrandValidator,deletebrandValidator,updatebrandValidator, createbrandValidator} =require("../utils/validator/brandVlidator")
const { param, validationResult } = require('express-validator');



router.route("/").get(getBrand)
.post(createbrandValidator,createBrand)

router.route("/:id").get(getbrandValidator,getSpecificBrand)

.put(updatebrandValidator,updateBrand)

.delete(deletebrandValidator,deleteBrand)

;



module.exports=router;