const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const sharp =require("sharp")

const multerOptions=()=>{
    const multerStorage=multer.memoryStorage(); 

    const multerFilter=(req,file,cb)=>{
         if(file.mimetype.startsWith("image")){
            cb(null,true)
        }
        else{
            cb(new appError("only imaged allowed",400),false)
        }
    }
    
    const upload=multer({ storage : multerStorage  ,fileFilter:multerFilter})
    return upload

}


const uploadSingleImage=(fieldName)=>{
    return  multerOptions().single(`${fieldName}`)
}




const uploadMixedImage=(arrayOfField)=>{
    return  multerOptions().fields(arrayOfField)
    
    }



module.exports={uploadSingleImage,uploadMixedImage}
