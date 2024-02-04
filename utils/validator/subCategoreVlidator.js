const validator=require("../../middleware/validator")
const { check } = require('express-validator');
const getSubCategoreValidator=[check("id").isMongoId().withMessage("invalid Subcategore id"),validator

]

const createSubCategoreValidator=[check("name").notEmpty().withMessage('required')
.isLength({max:33}).withMessage("too long ")
.isLength({min:3}).withMessage("too short "),
check("categore").isMongoId().withMessage("invalid mongoo id ")
.notEmpty().withMessage("categore must be valid")

,
validator

]
const deleteSubCategoreValidator=[check("id").isMongoId().withMessage("invalid Subcategore id"),validator

]
const updateSubCategoreValidator=[
    check("id").isMongoId().withMessage("invalid Subcategore id"),validator


]



module.exports={
    createSubCategoreValidator,
    getSubCategoreValidator,
    updateSubCategoreValidator,
    deleteSubCategoreValidator
    
   
}
    
