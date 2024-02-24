const mongoose=require("mongoose");
const couponSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"coupon name is required"],
        trim:true,
        unique:true

    },
    expire:{
        type:Date,
        required:[true,"expire date is required"],

    },
    discount:{
        type:Number,
        required:[true,"discount number is required"]
    }
},{timestamps:true})

const couponModel=mongoose.model("coupon",couponSchema)

module.exports=couponModel
