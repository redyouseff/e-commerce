
const asyncHandler = require('express-async-handler')
const appError =require("../utils/apiError")
const apiFeatures =require("../utils/apiFeatures")



const deletOne=(model)=>{
  return  asyncHandler(async(req,res,next)=>{
        const id =req.params.id
    
      
            const document = await model.findByIdAndDelete(id)
            if(!document){
                return next (new appError(`not founded document on id ${id}`,400))

            }
              
         
            res.status(200).json("document deleted")
    
       
          
    
        
        
       
    
    })
}

    const updateOne=(model)=>{
        return asyncHandler(async(req,res,next)=>{
       
            try{
                const cat = await model.findByIdAndUpdate(req.params.id,req.body,
                {new:true})
                cat.save();
                res.status(200).json({data:cat})
        
            }
            catch{
                return next (new appError(`not founded subcategore on ${req.params.id}`,400))
        
            }
            
           
           
        
        })
    }

    const createOne=(model)=>{
        return asyncHandler( async(req,res)=>{
   
  
            const cat= await model.create(req.body)
          
          res.status(200).send({data:cat})
          
      
      })
    }
    const getOne=(model,populatetionOptions)=>{
        return  asyncHandler(async(req,res,next)=>{

        
          
                let document =  model.findById(req.params.id)
                if(populatetionOptions){
                    document= document.populate(populatetionOptions)
                }
                    
                   const result= await document;
           
                if(!result){
                    req.status(400).json({messega:"error on finding this id"})
                }
                        
                res.status(200).json({data:result})
            
            
            
            
            
            
            })
    }
    const getAll=(model)=>{
        return  asyncHandler( async(req,res)=>{
            filter={}
            
            if(req.filterObj){
                filter=req.filterObj 
            }
            
         
            const countDocuments=await model.countDocuments()
            const queryStringObject={...req.query}
                const Features=new apiFeatures(queryStringObject,model.find(filter))
        
               .paginate(countDocuments)
               .filter()
                .search()
                .limitFields()
                .sort()

                
                
                const {paginationRedult,mongooseQuery}=Features
                const product  =await mongooseQuery
        
            
            res.status(200).json({pagination:paginationRedult, result:product.length, data:product})
            
        
        
        })
    }




module.exports={
    deletOne,
    updateOne,
     createOne,
     getOne,
     getAll
     

    
}




