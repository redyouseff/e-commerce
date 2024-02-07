const express =require("express")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/categore' })


const {getCategore,createCategore,getSpecificCategore, updateCategore, deleteCategore, reasizeImage}=require("../services/categoreService")
const router=express.Router();
const {getCategoreValidator, createCategoreValidator, deleteCategoreValidator, updateCategoreValidator} =require("../utils/validator/categoreVlidator")
const { param, validationResult } = require('express-validator');
const subCategoreRouter=require("./subCategoreRouter")
const {uploadCategoreImage}=require("../services/categoreService")

router.route("/").get(getCategore)
.post(uploadCategoreImage,reasizeImage, createCategoreValidator,createCategore)

router.use("/:categoreId/subCategore",subCategoreRouter)

router.route("/:id").get(getCategoreValidator,getSpecificCategore)

.put(uploadCategoreImage,reasizeImage,updateCategoreValidator,updateCategore)

.delete(deleteCategoreValidator,deleteCategore)

;



module.exports=router;