const express=require("express")
const router=express.Router()
const wrapAsync = require("../util/wrapAsync")
const passport=require("passport")
const { saveURL} = require("../middleWare")

router.get("/",(req,res)=>{
    res.render("../views/users/login.ejs")
})
.post("/",saveURL,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),wrapAsync(async(req,res)=>{
    let {email,username,password}= req.body
    res.locals.user=req.user;
    req.flash("success",`Welcome Back "${username}"`)
    res.redirect(res.locals.redirect || "/index")
}))
module.exports=router;