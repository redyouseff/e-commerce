const express =require("express")
const {createUser, updateUser,deleteUser,getSpecificUser, getUser,uploadImage,reasizeImage,changePassword,getLoggedUser,updateLoggedUserPassword,updateLoggedUserData,deleteLoggedUserData}=require("../services/userService")
const router=express.Router();
const{protect,allowedTo,test}=require("../services/authService")

const {  getUserValidator,
    deleteUserValidator,
    updateUserValidator,
    createUserValidator,
    changePasswordValidator,
    updateLogedUserValidator
} =require("../utils/validator/userVlidator")

router.get("/getme",protect,getLoggedUser,getSpecificUser)
router.post("/changeMyPassword",protect,updateLoggedUserPassword)
router.post("/updateMyData",protect,updateLogedUserValidator,updateLoggedUserData)
router.delete("/deleteMyData",protect,deleteLoggedUserData)


router.route("/").get(protect,allowedTo("admin","user"),getUser)
.post(protect,allowedTo("admin"),uploadImage,reasizeImage,createUserValidator,createUser)
router.route("/:id").get(getUserValidator,getSpecificUser)
.put(protect,allowedTo("admin","manger"),uploadImage,reasizeImage,updateUserValidator,updateUser)
.delete(protect,allowedTo("admin"),deleteUserValidator,deleteUser)



router.put("/changePassword/:id",changePasswordValidator,changePassword)





module.exports=router;