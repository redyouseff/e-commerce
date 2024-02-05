const { query } = require("express");

class apiFeatures {
    constructor(queryStringObject,mongooseQuery){
        this.queryStringObject=queryStringObject;
        this.mongooseQuery=mongooseQuery;
      

    }
    filter(){
        let quearyStr={...this.queryStringObject}
   
    const excludesFields=["padge","limit","sort","fields"]
   
    excludesFields.forEach((field)=> delete quearyStr[field])
    let quearyString=JSON.stringify(quearyStr);
    quearyString=quearyString.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
    this.mongooseQuery=this.mongooseQuery.find(JSON.parse(quearyString))
    console.log(this.queryStringObject)
    return this
    }
    
    
    sort(){

    
        if(this.queryStringObject.sort){
            
            const sort=this.queryStringObject.sort.split(',').join(" ")
            console.log(sort)
           
            this.mongooseQuery=this.mongooseQuery.sort(sort)
    
    
        }
        return this ;

    }


    limitFields(){
       
        if(this.queryStringObject.fields){
       
            const fields=this.queryStringObject.fields.split(",").join(" ")
            console.log(fields)
            this.mongooseQuery=this.mongooseQuery.select(fields);
           
        }
        return this;
    }


    search(modelName){
        if(this.queryStringObject.keyword){
            if(modelName=="product"){
            let query ={};
            query.$or = [
                { title: { $regex: this.queryStringObject.keyword, $options: 'i' } },
                { description: { $regex: this.queryStringObject.keyword, $options: 'i' } },
              ];
            this.mongooseQuery=this.mongooseQuery.find(query)
        }
        else{
            query= { name: { $regex: this.queryStringObject.keyword, $options: 'i' } }
        }
        }
        return this ;
    }
    paginate(countDocuments){
        const padge=this.queryStringObject.padge |1;
        const limit =this.mongooseQuery.limit | 5;
        const skip =(padge - 1) * limit
        const endIndex=padge * limit
        const pagination={};
        pagination.currentPadge=padge;
        pagination.limit=limit;
        pagination.numberOfPadge=(Math.ceil(countDocuments / limit))
        if(endIndex<countDocuments){
            pagination.next=padge + 1
        }
        if(skip>0){
            pagination.prev=padge - 1;

        }
        this.paginationRedult=pagination
        

        this.mongooseQuery=this.mongooseQuery.skip(skip).limit(limit)
        return this
    }




}
module.exports=apiFeatures