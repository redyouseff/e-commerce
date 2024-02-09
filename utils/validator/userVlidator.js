const validator=require("../../middleware/validator")
const { check,body } = require('express-validator');
const userModel =require("../../models/userModel")
const slugify =require("slugify");
const { use } = require("../../routes/user");
const bcrypt=require("bcrypt")
const getUserValidator=[check("id").isMongoId().withMessage("invalid User id"),validator

]

const createUserValidator=[check("name").notEmpty().withMessage('required')

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
check("profileImage").optional(),
check("role").optional(),
check("phone").isMobilePhone("ar-EG").optional().withMessage("only epyption numbers"),



validator

]
const deleteUserValidator=[check("id").isMongoId().withMessage("invalid User id"),validator

]
const updateUserValidator=[
    check("id").isMongoId().withMessage("invalid User id"),
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    
    }),
    check("profileImage").optional(),
check("role").optional(),
check("phone").isMobilePhone("ar-EG").optional().withMessage("only epyption numbers"),

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

)

    ,validator



]
const   changePasswordValidator=[
    check("id").isMongoId().withMessage("invalid User id"),
    check("currrentPassword").notEmpty().withMessage("currrentPassword cant be  empty"),
    check("confirmPassword").notEmpty().withMessage(" confirmPassword cant be empty  "),
    check("password").notEmpty().withMessage(" password is required")
    .custom( async(val,{req})=>{
        const user=await userModel.findById(req.params.id)
        if(!user){
            throw new Error("user not found")

        }

        const correctPassword=await bcrypt.compare(req.body.currrentPassword,user.password)
        if(!correctPassword){
            throw new Error("incorrect password")
        }
        if(val!=req.body.confirmPassword){
            throw new Error("incorrect confirmation")

        }


    })
    
    ,validator



]

const updateLogedUserValidator=[
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    
    }),
  

check("phone").isMobilePhone("ar-EG").optional().withMessage("only epyption numbers"),

check("email")
.notEmpty()
.withMessage("email is requires")
.isEmail()
.withMessage("must be an email ")

    ,validator



]

module.exports={
    getUserValidator,
    deleteUserValidator,
    updateUserValidator,
    createUserValidator,
    changePasswordValidator,
    updateLogedUserValidator
}
    
