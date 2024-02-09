const express =require("express")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/categore' })


const {getCategore,createCategore,getSpecificCategore, updateCategore, deleteCategore, reasizeImage}=require("../services/categoreService")
const router=express.Router();
const {getCategoreValidator, createCategoreValidator, deleteCategoreValidator, updateCategoreValidator} =require("../utils/validator/categoreVlidator")
const { param, validationResult } = require('express-validator');
const subCategoreRouter=require("./subCategoreRouter")
const {uploadCategoreImage}=require("../services/categoreService")
const{protect,allowedTo}=require("../services/authService")

router.route("/").get(getCategore)
.post(protect,allowedTo("admin","manger"),uploadCategoreImage,reasizeImage, createCategoreValidator,createCategore)

router.use("/:categoreId/subCategore",subCategoreRouter)

router.route("/:id").get(getCategoreValidator,getSpecificCategore)

.put(protect,allowedTo("admin","manger"),uploadCategoreImage,reasizeImage,updateCategoreValidator,updateCategore)

.delete(protect,allowedTo("admin"),deleteCategoreValidator,deleteCategore)

;



module.exports=router;