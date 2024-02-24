const couponModel=require("../models/couponModel")
const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const factory=require("./handlersFactory")




const getCoupon=factory.getAll(couponModel)




const createCoupon=factory.createOne(couponModel)


const getSpecificCoupon=factory.getOne(couponModel)


const updateCoupon =factory.updateOne(couponModel)

const deleteCoupon=factory.deletOne(couponModel);





module.exports= {
   createCoupon,
   updateCoupon,
   deleteCoupon,
   getSpecificCoupon,
   getCoupon,
   



};