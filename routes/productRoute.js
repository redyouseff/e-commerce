const express =require("express")
const { getProduct,createProduct,getSpecificProduct,updateProduct, deleteProduct,uploadProductImage,reasizeImage}=require("../services/productService")
const router=express.Router();
const {getProductValidator, createProductValidator, deleteProductValidator, updateProductValidator} =require("../utils/validator/productVlidator")
const { param, validationResult } = require('express-validator');




router.route("/").get(getProduct)
.post(uploadProductImage,reasizeImage,createProductValidator,createProduct)

router.route("/:id").get(getProductValidator,getSpecificProduct)

.put(uploadProductImage,reasizeImage,updateProductValidator,updateProduct)

.delete(deleteProductValidator,deleteProduct)

;

module.exports=router;