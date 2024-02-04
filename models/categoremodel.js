const mongoose=require("mongoose");

const categoreSchema=new mongoose.Schema({
    name:{
        unique:true,
        type:String,
      
        required:[true,"name is required"],
        
        minLength:[3,"too short categore name"],
        maxLength:[32,"too long categore name"]
    },
    // a b => a-b
    slug:{
        type:String,
        lowercase:true,
    },
    image:{
        type:String
    }
}
,{ timestamps:true})


const categoreModel=new mongoose.model("categore",categoreSchema)

module.exports=categoreModel
