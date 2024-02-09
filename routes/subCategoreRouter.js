const express =require("express")
const router=express.Router({mergeParams:true});
const {createSubCategore, getSubCategore, getSpecificSubCategore, updateSubCategore, deleteSubCategore, setCategoreIdToBody, setFilter}=require("../services/subCategoreService")
const {createSubCategoreValidator, getSubCategoreValidator, updateSubCategoreValidator, deleteSubCategoreValidator}=require("../utils/validator/subCategoreVlidator")
const{protect,allowedTo}=require("../services/authService")
router.route("/") .post( protect,allowedTo("admin","manger"),setCategoreIdToBody,createSubCategoreValidator,createSubCategore)
.get(setFilter,getSubCategore)

router.route("/:id") .get(getSubCategoreValidator,getSpecificSubCategore)
.put(protect,allowedTo("admin","manger"),updateSubCategoreValidator,updateSubCategore)
.delete(protect,allowedTo("admin"),deleteSubCategoreValidator,deleteSubCategore)


module.exports=router