const express =require("express")
const {createCashOrder,setFilterToLoggedUser,
    getAllOrder,getSpecificOrder,  updateOrderToPaid,updateOrderToDelivered,checkoutSession
}=require("../services/orderService")
const router=express.Router();
const{protect,allowedTo}=require("../services/authService")
router.route("/checout-session/:cartId").get(protect,allowedTo("user"),checkoutSession)
router.route("/:cartId").post(protect,allowedTo("user"),createCashOrder)
router.route("/").get(protect,allowedTo("user","manger"),setFilterToLoggedUser,getAllOrder)
router.route("/:id").get(protect,allowedTo("user","admin"),getSpecificOrder)
router.route("/:id/payed").put(protect,allowedTo("admin"),updateOrderToPaid)
router.route("/:id/delivered").put(protect,allowedTo("admin"),updateOrderToDelivered)



module.exports=router;