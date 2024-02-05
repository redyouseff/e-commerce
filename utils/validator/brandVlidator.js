const validator=require("../../middleware/validator")
const { check,body } = require('express-validator');
const slugify =require("slugify")
const getbrandValidator=[check("id").isMongoId().withMessage("invalid brand id"),validator

]

const createbrandValidator=[check("name").notEmpty().withMessage('required')
.isLength({max:33}).withMessage("too long ")
.isLength({min:3}).withMessage("too short ")
.custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true

})


,
validator

]
const deletebrandValidator=[check("id").isMongoId().withMessage("invalid brand id"),validator

]
const updatebrandValidator=[
    check("id").isMongoId().withMessage("invalid brand id"),
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    
    })

    ,validator


]



module.exports={
    getbrandValidator,
    deletebrandValidator,
    updatebrandValidator,
    createbrandValidator
}
    
