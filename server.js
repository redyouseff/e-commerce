const express = require("express");
const app =express();
const dotenv=require("dotenv");
const { env } = require("process");
const morgan=require("morgan")
const bodyParser = require('body-parser')
const dbConnection=require("./config/dbConnection")
const categoreRoute=require("./routes/categoreRoute")
const subCategoreRoute=require("./routes/subCategoreRouter")
const brandRoute=require("./routes/brandRoute")
const productRoute=require("./routes/productRoute")
const userRoute=require("./routes/userRoute")
const appError =require("./utils/apiError")
const signupRoute=require("./routes/authRoute")
const globelError=require("./middleware/globelError");
const { error } = require("console");
const path = require("path");
const { signup } = require("./services/authService");

app.use(express.static(path.join(__dirname,"uploads")))
app.use(bodyParser.urlencoded({ extended: false }))
dotenv.config({path:"config.env"})
app.use(express.json())

if(process.env.NODE_ENV=="development"){
    app.use(morgan("dev"))
    console.log(`mode is ${process.env.NODE_ENV}`)
}




// connection to mongo
dbConnection();




const server= app.listen(process.env.PORT,(req,res)=>{
    console.log("app listened on port 3000")
    
}) 

//route
app.use("/api/v1/categore",categoreRoute)
app.use("/api/v1/subCategore",subCategoreRoute)
app.use("/api/v1/brand",brandRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/auth",signupRoute)



app.use("*",(req,res,next)=>{
  next(new appError(`cant find the url ${req.originalUrl}`,400))

})

//local error handling 
app.use(globelError)


//globel error handling 
process.on("unhandledRejection",(err)=>{
    console.log(` unhandledRejection error :${err}`)
    server.close(()=>{
        console.error("shutin down the server ")
        process.exit(1);
    })
    
})



