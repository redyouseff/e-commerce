const validator=require("../../middleware/validator")
const { check,body } = require('express-validator');
const userModel =require("../../models/userModel")
const slugify =require("slugify");
const { use } = require("../../routes/user");
const bcrypt=require("bcrypt")




const signupValidator=[check("name").notEmpty().withMessage('required')

.isLength({min:3}).withMessage("too short ")
.custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true

}),
check("email")
.notEmpty()
.withMessage("email is requires")
.isEmail()
.withMessage("must be an email ")
.custom((val)=>
userModel.findOne({email: val}).then((user)=>{
    if(user){
        return Promise.reject( new Error("email is existed"))
    }
})

),
check("passwordConfirm").notEmpty().withMessage("passwordConfirm is required")
,
check("password")
.notEmpty()
.withMessage("password is required")
.isLength({min : 6})
.withMessage("password is to short ")
.custom((val,{req})=>{
    console.log(req.body)
    if(val!=req.body.passwordConfirm){
      
        throw new Error("passwordConfim is not match")
      
    }

    return true;
})
,




validator

]


const loginValidator=[
check("email")
.notEmpty()
.withMessage("email is requires")
.isEmail()
.withMessage("must be an email ")
,

check("password")
.notEmpty()
.withMessage("password is required")
.isLength({min : 6})
.withMessage("password is to short ")
,




validator

]



module.exports={
   signupValidator,
   loginValidator
}
    
