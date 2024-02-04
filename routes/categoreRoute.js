const express =require("express")
const {getCategore,createCategore,getSpecificCategore, updateCategore, deleteCategore}=require("../services/categoreService")
const router=express.Router();
const {getCategoreValidator, createCategoreValidator, deleteCategoreValidator, updateCategoreValidator} =require("../utils/validator/categoreVlidator")
const { param, validationResult } = require('express-validator');
const subCategoreRouter=require("./subCategoreRouter")

router.use("/:categoreId/subCategore",subCategoreRouter)

router.route("/").get(getCategore)
.post(createCategoreValidator,createCategore)

router.route("/:id").get(getCategoreValidator,getSpecificCategore)

.put(updateCategoreValidator,updateCategore)

.delete(deleteCategoreValidator,deleteCategore)

;



module.exports=router;