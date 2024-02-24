const categoreRoute=require("./categoreRoute")
const subCategoreRoute=require("./subCategoreRouter")
const brandRoute=require("./brandRoute")
const productRoute=require("./productRoute")
const userRoute=require("./userRoute")
const signupRoute=require("./authRoute")
const reveiwRoute=require("./reviewRoute")
const wishlistRoute=require("./wishlistRoute")
const addressRoute=require("./addressRoute")
const couponRoute=require("./couponRoute")
const cartRoute=require("./cartRoute")
const orderRoute=require("./orderRoute")

const mountRoutes=(app)=>{
    app.use("/api/v1/categore",categoreRoute)
app.use("/api/v1/subCategore",subCategoreRoute)
app.use("/api/v1/brand",brandRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/auth",signupRoute)
app.use("/api/v1/review",reveiwRoute)
app.use("/api/v1/wishlist",wishlistRoute)
app.use("/api/v1/address",addressRoute)
app.use("/api/v1/coupon",couponRoute)
app.use("/api/v1/cart",cartRoute)
app.use("/api/v1/order",orderRoute)



}

module.exports=mountRoutes