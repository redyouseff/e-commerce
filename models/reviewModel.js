const mongoose=require("mongoose");
const { mkcol } = require("../routes/userRoute");
const productModel =require("./productModel")
const reviewSchema=mongoose.Schema({
    title:{
        type:String
    },
    rating:{
        type:Number,
        min:[1,"min reating is 1"],
        max:[5,"max rating is 5"],
        required:[true,"rating is requred"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"review must belong to user"]
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"product",
        required:[true,"review must belong to product"]
    }


},{timestamps:true})
reviewSchema.pre(/^find/,function(next){
    this.populate({path:"user",select:"name"})
    next();

})

reviewSchema.statics.calcRatingAverageAndRatingQuantity=async function(productId){
    const result=await this.aggregate([
        { $match:{product:productId}},
        {$group:{
            _id:"product",
            ratingAverage:{$avg:'$rating'},
            ratingQuantity:{$sum:1}

            
        }}
    ])
    
    console.log(result)
    if(result.length>0){
        await productModel.findByIdAndUpdate(productId,{
            ratingAverage:result[0].ratingAverage,
            ratingQuantity:result[0].ratingQuantity
            


        })
    }
    else{
        await productModel.findByIdAndUpdate(productId,{
            ratingAverage:0,
            ratingQuantity:0
            


        })

    }


}


reviewSchema.post("save",async function(){
    await this.constructor.calcRatingAverageAndRatingQuantity(this.product)
})
;
reviewSchema.post("remove",async function(){
    await this.constructor.calcRatingAverageAndRatingQuantity(this.product)

})

const reviewModel=mongoose.model("review",reviewSchema)
module.exports=reviewModel
