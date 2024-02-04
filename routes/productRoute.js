const express =require("express")
const { getProduct,createProduct,getSpecificProduct,updateProduct, deleteProduct,}=require("../services/productService")
const router=express.Router();
const {getProductValidator, createProductValidator, deleteProductValidator, updateProductValidator} =require("../utils/validator/productVlidator")
const { param, validationResult } = require('express-validator');




router.route("/").get(getProduct)
.post(createProductValidator,createProduct)

router.route("/:id").get(getProductValidator,getSpecificProduct)

.put(updateProductValidator,updateProduct)

.delete(deleteProductValidator,deleteProduct)

;

module.exports=router;