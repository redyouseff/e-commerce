const express =require("express")
const{protect,allowedTo,test}=require("../services/authService")
const router=express.Router();
const {addProductToWishlist,deleteProductFromWishlist,getLoggedUserWishlist}=require("../services/wishlistService")
router.route("/").post(protect,allowedTo("user","admin"),addProductToWishlist)
.get(protect,allowedTo("admin","user"),getLoggedUserWishlist)
router.route("/:productId").delete(protect,allowedTo("user","admin"),deleteProductFromWishlist)

module.exports=router
