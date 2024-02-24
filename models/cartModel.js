const mongoose=require("mongoose");
const cartSchema=mongoose.Schema({
    cartItems:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"product"
        },
        quantity:Number,
        color:String,
        price:Number

    }],
    totalPrice:Number,
    totalPriceAfterDiscount:Number,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }


},{timestamps:true})

const cartModel=mongoose.model("cart",cartSchema)
module.exports=cartModel