const validator=require("../../middleware/validator")
const { check } = require('express-validator');
const getbrandValidator=[check("id").isMongoId().withMessage("invalid brand id"),validator

]

const createbrandValidator=[check("name").notEmpty().withMessage('required')
.isLength({max:33}).withMessage("too long ")
.isLength({min:3}).withMessage("too short ")
,
validator

]
const deletebrandValidator=[check("id").isMongoId().withMessage("invalid brand id"),validator

]
const updatebrandValidator=[
    check("id").isMongoId().withMessage("invalid brand id"),validator


]



module.exports={
    getbrandValidator,
    deletebrandValidator,
    updatebrandValidator,
    createbrandValidator
}
    
