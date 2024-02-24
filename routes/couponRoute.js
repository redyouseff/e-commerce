const express =require("express")
const {   createCoupon,
    updateCoupon,
    deleteCoupon,
    getSpecificCoupon,
    getCoupon,}=require("../services/couponService")
const router=express.Router();
const{protect,allowedTo}=require("../services/authService")



router.route("/").get(getCoupon)
.post(protect,allowedTo("admin","manger"),createCoupon)

router.route("/:id").get(protect,allowedTo("admin","manger"),getSpecificCoupon)

.put(protect,allowedTo("admin","manger"),updateCoupon)

.delete(protect,allowedTo("admin","manger"),deleteCoupon)

;



module.exports=router;