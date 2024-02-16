

const express =require("express")
const{protect,allowedTo}=require("../services/authService")
const router=express.Router();
const {  addAddress,
    deleteAddress,
    getLoggedUserAddress
}=require("../services/addressService")

router.route("/").post(protect,allowedTo("user","admin"),addAddress)
.get(protect,allowedTo("admin","user"),getLoggedUserAddress)
router.route("/:addressId").delete(protect,allowedTo("user","admin"),deleteAddress)

module.exports=router
