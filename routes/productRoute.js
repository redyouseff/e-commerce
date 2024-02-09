const express =require("express")
const { getProduct,createProduct,getSpecificProduct,updateProduct, deleteProduct,uploadProductImage,reasizeImage}=require("../services/productService")
const router=express.Router();
const {getProductValidator, createProductValidator, deleteProductValidator, updateProductValidator} =require("../utils/validator/productVlidator")
const { param, validationResult } = require('express-validator');
const{protect,allowedTo}=require("../services/authService")



router.route("/").get(getProduct)
.post(protect,allowedTo("admin","manger"),uploadProductImage,reasizeImage,createProductValidator,createProduct)

router.route("/:id").get(getProductValidator,getSpecificProduct)

.put(protect,allowedTo("admin","manger"),uploadProductImage,reasizeImage,updateProductValidator,updateProduct)

.delete(protect,allowedTo("admin"),deleteProductValidator,deleteProduct)

;

module.exports=router;