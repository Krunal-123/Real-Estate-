const express=require("express")
const router=express.Router()
const ExpressError=require("../util/ExprssError")

router.all("*", (req, res, next) => {
    next(new ExpressError(404,'Page not found'))
 })
 .use((err,req,res,next)=>{
    let {statusCode=500,message='Something Went Wrong'}=err
    res.render("../views/listing/error.ejs",{message})
 })
 module.exports=router;

