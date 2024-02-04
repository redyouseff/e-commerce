const mongoose =require("mongoose");

const subCategoreSchema =new mongoose.Schema({
    name:{
        type:String,
        require:[true,"name is requred"],
        unique:[true,"name must be unique"],
        trim:true,
        minLength:[3,"too short name"],
        maxLength:[33,"too long name"]

    },
    slug:{
        type:String,
        lowercase:true,

    },
    categore:{
        type:mongoose.Schema.ObjectId,
        ref:"categore",
        require:[true,"categore is required"]
    }
},
    
    
    {timestamps:true})

    const subCategoreModel=new mongoose.model("subCategore",subCategoreSchema)
    module.exports=subCategoreModel