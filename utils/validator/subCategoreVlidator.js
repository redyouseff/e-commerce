const validator=require("../../middleware/validator")
const { check, body } = require('express-validator');
const slugify=require("slugify")
const getSubCategoreValidator=[check("id").isMongoId().withMessage("invalid Subcategore id"),validator

]

const createSubCategoreValidator=[check("name").notEmpty().withMessage('required')
.isLength({max:33}).withMessage("too long ")
.isLength({min:3}).withMessage("too short ")
.custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true

})

,
check("categore").isMongoId().withMessage("invalid mongoo id ")
.notEmpty().withMessage("categore must be valid"),

validator

]
const deleteSubCategoreValidator=[check("id").isMongoId().withMessage("invalid Subcategore id"),validator

]
const updateSubCategoreValidator=[
    check("id").isMongoId().withMessage("invalid Subcategore id"),
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    
    })

    ,validator


]



module.exports={
    createSubCategoreValidator,
    getSubCategoreValidator,
    updateSubCategoreValidator,
    deleteSubCategoreValidator
    
   
}
    
