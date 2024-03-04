const express =require("express")

const router=express.Router();
const {signupValidator,loginValidator} =require("../utils/validator/authVlidator")
const {signup,login,forgetPassword,verifyResetCode,resetPassword}=require("../services/authService")
router.route("/signup").post(signupValidator,signup)
router.route("/login").post(loginValidator,login)
router.route("/forgetPassword").post(forgetPassword)
router.route("/verifyResetCode").post(verifyResetCode)
router.route("/resetPassword").post(resetPassword)






module.exports=router;