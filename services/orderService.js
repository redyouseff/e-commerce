const appError =require("../utils/apiError")
const apiFeatures=require("../utils/apiFeatures")
const asyncHandler = require('express-async-handler')
const cartModel=require("../models/cartModel")
const orderModel=require("../models/orderModel")
const productModel=require("../models/productModel")
const { updateOne } = require("../models/couponModel")
const factory=require("./handlersFactory")
const { strip } = require("colors")
const stripe = require('stripe')('sk_test_51On9sTAB4crm8DAcDGfCMs7rpq1YyBz9z0ENMdiae2hl2k9JteJMTJOnJm45mgh0EOsnHkPRaMdAWLUuSDEa5xf200CR8uf7Wq')
const createCashOrder=asyncHandler(async(req,res,next)=>{
    const taxPrice=0;
    const shippingPrice=0
    const product =await productModel.find();
    const cart =await cartModel.findById(req.params.cartId)
    if(!cart){
        return next ( new appError(`no cart for this id ${req.params.cartId}`))
    }
    const cartPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice
    const totalOrderPrice=cartPrice

    const order=await orderModel.create({
            user:req.currentUser._id,
            cartItems:cart.cartItems,
            shippingAddress:req.body.shippingAddress,
            totalOrderPrice:totalOrderPrice


    })
  
    
    if(order){
        // const bulkOption=cart.cartItems.map((item)=>{
        //     updateOne: {
        //         filter: { _id: item.product }
        //         update: { $inc: { quantity: -item.quantity  } }
        //         update: { $inc: {  sold: +item.quantity } }
        //       }
              
        // })
        
        // await productModel.bulkWrite(bulkOption,{})
        cart.cartItems.map(async(item)=>{
            await productModel.findByIdAndUpdate(item.product,{
                $inc:{quantity:-item.quantity, sold: +item.quantity}
            })
            
        })
       
        await cartModel.findByIdAndDelete(req.params.cartId)

    }
    res.status(200).json({data:order})
}) 

const setFilterToLoggedUser=asyncHandler(async(req,res,next)=>{
    if(req.currentUser.role=="user"){
        req.filterObj={user:req.currentUser._id}
    }
    next()

})
const getAllOrder=factory.getAll(orderModel)
const getSpecificOrder=factory.getOne(orderModel)

const updateOrderToPaid=asyncHandler(async(req,res,next)=>{
    const order =await orderModel.findById(req.params.id)
    if(!order){
        return  next(new appError(`ther is no order for this id ${req.params.id}`))
    }
    order.isPaid=true;
    order.paidAt=Date.now()
    await order.save()
    res.status(200).json({data:order})

})

const updateOrderToDelivered=asyncHandler(async(req,res,next)=>{
    const order =await orderModel.findById(req.params.id)
    if(!order){
        return  next(new appError(`ther is no order for this id ${req.params.id}`))
    }
    order.isDelivered=true;
    order.deliveredAt=Date.now()
    await order.save()
    res.status(200).json({data:order})
})

const checkoutSession=asyncHandler(async(req,res,next)=>{
    
    const cart=await cartModel.findById(req.params.cartId)
    if(!cart){
        return next(new appError(`no cart for this id ${req.params.cartId}`))
    }
    const cartPrice= cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice
    const totalOrderPrice=cartPrice
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    currency: "egp",
                    product_data: {
                        name: req.currentUser.name,
                        
                    },
                    unit_amount: totalOrderPrice * 100, 
                },
                quantity: 1
            }
        ],
        

        mode:"payment",
        success_url: `${req.protocol}://${req.get("host")}/order`,
        cancel_url: `${req.protocol}://${req.get("host")}/cart`,
        customer_email: req.currentUser.email,
        client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress
     
    })
   
    
    res.status(200).json({session:session})


})

const webhookCheckout=asyncHandler(async(req,res,next)=>{
    const sig = req.headers['stripe-signature'];
    console.log("on function")
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig,'whsec_9qynp8dFIUUz5ITn9n0aZuxmv5WeWigP');
    } catch (err) {
        console.log("error")
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if(event.type == "checkout.session.completed"){
        console.log("order is ready to pay ...............................")
    }
  
    
})



module.exports={
    createCashOrder,
    setFilterToLoggedUser,
    getAllOrder,
    getSpecificOrder,
    updateOrderToPaid,
    updateOrderToDelivered,
    checkoutSession,
    webhookCheckout

}