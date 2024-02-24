const express =require("express")
const {addProductToCart,getLoggedUserCart,deleteSpecificItem,clearCart,updateCartItemQUantity,applyCoupon}=require("../services/cartService")
const router=express.Router();
const{protect,allowedTo}=require("../services/authService")



router.route("/").get(protect,allowedTo("user"),getLoggedUserCart)
 .post(protect,allowedTo("user"),addProductToCart)
 .delete(protect,allowedTo("user"),clearCart)
 .put(protect,allowedTo("user"),applyCoupon)
 router.route("/:itemId").delete(protect,allowedTo("user"),deleteSpecificItem)
 .put(protect,allowedTo("user"),updateCartItemQUantity)


// router.route("/:id").get(getbrandValidator,getSpecificBrand)

// .put(protect,allowedTo("admin","manger"),uploadBrandImage,reasizeImage,updatebrandValidator,updateBrand)

// .delete(protect,allowedTo("admin"),deletebrandValidator,deleteBrand)

;



module.exports=router;