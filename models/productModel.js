const mongoose =require("mongoose");
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required "],
        trim:true,
        minLength:[5,"too short title"],
        maxLength:[200,"too long title "]
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        required:[true,"description is required"],
        minLength:[30,"too short descripton "]

    },
    quantity:{
        type:Number,
        required:[true,"the quantity is required"]
    },

    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,"price is required "],
        trim:true,
        max:[2000000,"too long price"]
    },
    priceAfterDiscount:{
        type:Number
    },
    colors:[String],
    images:[String],
    imageCover:{
        type:String,
        required:[true,"image cover is required"]
    },
    categore:{
        type:mongoose.Schema.ObjectId,
        ref:"categore",
        required:[true,"categore is required"]
    },
    sugCategore:{
        type:[mongoose.Schema.ObjectId],
        ref:"subCategore"
    },
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:"brand"
    },
    ratingAverage:{
        type:Number,
        min:[1,"the number must be greater than 1"],
        max:[5,"the number cant be greater than 5"]

    },
     
    ratingQuantity:{
        type:Number,
        default:0
    }
    

    
}


    ,{timestamps:true})


    //mongoose middleware
    productSchema.pre(/^find/, function (next) {
        this.populate({
          path: 'categore',
          select: 'name -_id',
        });

        next();
      });
      

    const productModel=new mongoose.model("product",productSchema)
    module.exports =productModel;