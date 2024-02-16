const appError =require("../utils/apiError")
const userModel=require("../models/userModel")
const asyncHandler = require('express-async-handler')

const addAddress=asyncHandler(async(req,res,next)=>{


    const user = await userModel.findByIdAndUpdate(req.currentUser._id,{

        $addToSet:{addresses:req.body}
    },
    {new:true})

    res.status(200).json({status:"success",
message:"address added to the user",
 data:user.addresses

}
)

})


const deleteAddress=asyncHandler(async(req,res,next)=>{


    const user = await userModel.findByIdAndUpdate(req.currentUser._id,{

        $pull:{addresses:{_id:req.params.addressId}}
    },
    {new:true})

    res.status(200).json({status:"success",
message:"address deleted from user",
 data:user.addresses

}
)

})


const getLoggedUserAddress=asyncHandler(async(req,res,next)=>{

  
    const user =await userModel.findById(req.currentUser._id).populate("addresses")
    res.status(200).json({status:"success",result:user.addresses.length,date:user.addresses})

})






module.exports={
    addAddress,
    deleteAddress,
    getLoggedUserAddress

}
