const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,"name is required"],
        trim:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    email:{
        type:String,
        require:[true,"email is required"],
        unique:true,
        lowercase:true
    },
    phone:String,
    profileImage:String,
    password:{
        type:String,
        require:[true,"password is required"],
        minLength:[6,"too short password"],


    },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user"

    },
    active:{
        type:Boolean,
        default:true

    },
    passwordChangedAt:{
        type:Date

    },
    passwordResetCode:String,
    passwordResetExpires:Date,
    passwordResetVerified:Boolean,

    wishlist:[{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    }],
    
    addresses:[{
        id:{type:mongoose.Schema.Types.ObjectId},
        alias:String,
        details:String,
        phone:String,
        city:String,
        postalCode:String
    }]


 


},
{timestamps:true}
)
userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        return next();
    }
    
    this.password=await bcrypt.hash(this.password,12)

    next()
})

const userModel=mongoose.model("user",userSchema)
module.exports=userModel