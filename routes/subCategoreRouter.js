const express =require("express")
const router=express.Router({mergeParams:true});
const {createSubCategore, getSubCategore, getSpecificSubCategore, updateSubCategore, deleteSubCategore, setCategoreIdToBody, setFilter}=require("../services/subCategoreService")
const {createSubCategoreValidator, getSubCategoreValidator, updateSubCategoreValidator, deleteSubCategoreValidator}=require("../utils/validator/subCategoreVlidator")

router.route("/") .post( setCategoreIdToBody,createSubCategoreValidator,createSubCategore)
.get(setFilter,getSubCategore)

router.route("/:id") .get(getSubCategoreValidator,getSpecificSubCategore)
.put(updateSubCategoreValidator,updateSubCategore)
.delete(deleteSubCategoreValidator,deleteSubCategore)


module.exports=router