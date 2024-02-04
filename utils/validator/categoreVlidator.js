const validator=require("../../middleware/validator")
const { check } = require('express-validator');
const getCategoreValidator=[check("id").isMongoId().withMessage("invalid categore id"),validator

]

const createCategoreValidator=[check("name").notEmpty().withMessage('required')
.isLength({max:33}).withMessage("too long ")
.isLength({min:3}).withMessage("too short ")
,
validator

]
const deleteCategoreValidator=[check("id").isMongoId().withMessage("invalid categore id"),validator

]
const updateCategoreValidator=[
    check("id").isMongoId().withMessage("invalid categore id"),validator


]



module.exports={
    getCategoreValidator,
    deleteCategoreValidator,
    updateCategoreValidator,
    createCategoreValidator
}
    
