const express=require("express")
const router=express.Router()

router.get("/",(req,res,next)=>{
    req.logout((e)=>{
        if (e) {
            return next(e)
        }
        req.flash("error","Logout")
        res.redirect("/index")
    })
})
module.exports=router;