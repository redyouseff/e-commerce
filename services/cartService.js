const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const asyncHandler = require('express-async-handler')
const cartModel=require("../models/cartModel")
const productModel=require("../models/productModel")
const couponModel=require("../models/couponModel")


const calcTotalPrice=(cart)=>{
    let Price=0;
    cart.cartItems.forEach((item) => {
        
        
        Price +=item.quantity*item.price
        
    });
    
    cart.totalPrice=Price
    return Price;
   
   

}

const addProductToCart=asyncHandler(async(req,res,next)=>{
   
    
    const {productId,color}=req.body
    const product=await productModel.findById(productId)
    let cart=await cartModel.findOne({user:req.currentUser._id})
 
    
    if(!cart){
        cart =await cartModel.create({
            
            user:req.currentUser._id,
            cartItems:[{product:productId,color:color,price:product.price,quantity:"1"}]
        })
       
    }
    else{
       const productIndex=cart.cartItems.findIndex((item)=>item.product.toString()==productId&&item.color==color)
       if(productIndex>-1){
        
    //     let tCart=cart.cartItems[productIndex]
    //    tCart.quantity +=1
        cart.cartItems[productIndex].quantity ++;
       }
       else{  
        cart.cartItems.push({product:productId,color:color,price:product.price,quantity:"1"})
        
       }
    }
    
   
    calcTotalPrice(cart)
    cart.totalPriceAfterDiscount=undefined;
    cart.save();

    res.status(200).json({data:cart})

})

const getLoggedUserCart=asyncHandler(async(req,res,next)=>{
    const cart =await cartModel.findOne({user:req.currentUser._id});
    if(!cart){
        return next(new appError(`ther is no card for this id ${req.currentUser._id}` ))
    }
    res.status(200).json({status:'success',cartCount:cart.cartItems.length,data:cart})
})

const deleteSpecificItem=asyncHandler(async(req,res,next)=>{
    const cart =await cartModel.findOneAndUpdate({user:req.currentUser._id},
        {
            $pull:{cartItems:{_id:req.params.itemId}}
        },
        
        {new:true})
        calcTotalPrice(cart)
        cart.save();
        res.status(200).json({status:'success',cartCount:cart.cartItems.length,data:cart})

})
const clearCart=asyncHandler(async(req,res,next)=>{
    console.log()
    const cart =await cartModel.findOneAndDelete({user:req.currentUser._id},{new:true})
    res.status(200).json("cart is clean")
})
const updateCartItemQUantity=asyncHandler(async(req,res,next)=>{
    const {quantity}=req.body
    const cart =await cartModel.findOne({user:req.currentUser._id})
    if(!cart){
        return next(new appError(`ther is no cart for this user ${req.currentUser._id}`))
    }
    const itemIndex=cart.cartItems.findIndex((item)=>item._id.toString()==req.params.itemId)
    if(itemIndex>-1){
        cart.cartItems[itemIndex].quantity=quantity
    }
    else{
        return next(new appError(`ther is no item for this id ${req.params.itemId}`))
    }
    calcTotalPrice(cart)
    await cart.save();
    res.status(200).json({status:'success',cartCount:cart.cartItems.length,data:cart})


})

const applyCoupon=asyncHandler(async(req,res,next)=>{
    const coupon= await couponModel.findOne({
        name:req.body.name,
        expire:{$gt:Date.now()}

    })
    if(!coupon){
        return next (new appError(`ther is no coupon in this name ${req.body.name}`))

    }
    const cart =await cartModel.findOne({user:req.currentUser._id});
    console.log(cart)
    cart.totalPriceAfterDiscount=cart.totalPrice-((cart.totalPrice*coupon.discount)/100).toFixed(2)
    await cart.save()
    res.status(200).json({status:'success',cartCount:cart.cartItems.length,data:cart})

    





})

module.exports={
    addProductToCart,
    getLoggedUserCart,
    deleteSpecificItem,
    clearCart,
    updateCartItemQUantity,
    applyCoupon

}
 
