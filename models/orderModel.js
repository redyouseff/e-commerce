const mongoose =require("mongoose");
const orederShema=mongoose.Schema({
user:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:[true,"oredr must belong to an users"]
},
cartItems:[
    {
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"product",

        },
        quantity:Number,
        color:String,
        price:Number
    }
],
taxPrice:{
    type:Number,
    default:0
},
shippingPrice:{
    type:Number,
    default:0
},
shippingAddress:{
    details:String,
    phone:Number,
    city:String,
    postaCode:String
}

,
totalOrderPrice:{
    type:Number
},
paymentMethodType:{
    type:String,
    enum:["cash","card"],
    default:"cash"
},
isPaid:{
    type:Boolean,
    default:false
},
paidAt:Date,
isDelivered:{
    type:Boolean,
    default:false
},
deliveredAt:{
    type:Date,

}

},{timestamps:true})


orederShema.pre(/^find/,function(next){
this.populate({path:"user",
select:"name email phone"
}).populate({
    path:"cartItems.product",
    select:'title'
})
next()

})
const orderModel=mongoose.model("order",orederShema)
module.exports=orderModel
