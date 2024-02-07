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

const setImageUrl=(doc)=>{
    if(doc.image){

 
    const imageUrl=`${process.env.BASE_URL}/categore/${doc.image}`
    doc.image=imageUrl
}
}
//execute after findone findall update 
categoreSchema.post("init",(doc)=>{
    setImageUrl(doc)

})
categoreSchema.post("save",(doc)=>{
    setImageUrl(doc)
})


const categoreModel=new mongoose.model("categore",categoreSchema)

module.exports=categoreModel
