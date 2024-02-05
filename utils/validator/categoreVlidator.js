const validator=require("../../middleware/validator")
const { check,body } = require('express-validator');
const slugify =require("slugify")
const getCategoreValidator=[check("id").isMongoId().withMessage("invalid categore id"),validator

]

const createCategoreValidator=[check("name").notEmpty().withMessage('required')
.isLength({max:33}).withMessage("too long ")
.custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true

})


.isLength({min:3}).withMessage("too short ").custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true

})
,
validator

]
const deleteCategoreValidator=[check("id").isMongoId().withMessage("invalid categore id"),validator

]
const updateCategoreValidator=[
    check("id").isMongoId().withMessage("invalid categore id"),
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    
    })

    ,validator


]



module.exports={
    getCategoreValidator,
    deleteCategoreValidator,
    updateCategoreValidator,
    createCategoreValidator
}
    
