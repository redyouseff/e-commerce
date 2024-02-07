const mongoose=require("mongoose");

const brandSchema=new mongoose.Schema({
    name:{
        unique:true,
        type:String,
      
        required:[true,"name is required"],
        
        minLength:[3,"too short brand name"],
        maxLength:[32,"too long brand name"]
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


const setImageUrl=(doc)=>{
    if(doc.image){

 
    const imageUrl=`${process.env.BASE_URL}/brand/${doc.image}`
    doc.image=imageUrl
}
}
//execute after findone findall update 
brandSchema.post("init",(doc)=>{
    setImageUrl(doc)

})
brandSchema.post("save",(doc)=>{
    setImageUrl(doc)
})




const brandModel=new mongoose.model("brand",brandSchema)

module.exports=brandModel
