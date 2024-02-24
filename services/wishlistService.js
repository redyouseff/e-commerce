const appError =require("../utils/apiError")
const userModel=require("../models/userModel")
const asyncHandler = require('express-async-handler')

const addProductToWishlist=asyncHandler(async(req,res,next)=>{


    const user = await userModel.findByIdAndUpdate(req.currentUser._id,{

        $addToSet:{wishlist:req.body.productId}
    },
    {new:true})
   

    res.status(200).json({status:"success",
message:"product added to your wishlist",
 data:user.wishlist

}
)

})


const deleteProductFromWishlist=asyncHandler(async(req,res,next)=>{


    const user = await userModel.findByIdAndUpdate(req.currentUser._id,{

        $pull:{wishlist:req.params.productId}
    },
    {new:true})

    res.status(200).json({status:"success",
message:"product deleted from wishlist",
 data:user.wishlist

}
)

})


const getLoggedUserWishlist=asyncHandler(async(req,res,next)=>{

    const user =await userModel.findById(req.currentUser._id).populate("wishlist")
    res.status(200).json({status:"success",data:user.wishlist})

})






module.exports={
    addProductToWishlist,
    deleteProductFromWishlist,
    getLoggedUserWishlist

}
