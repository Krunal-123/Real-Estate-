const express=require("express")
const router=express.Router()
const wrapAsync=require("../util/wrapAsync")
const User=require("../models/user")

router.get("/", (req,res)=>{
    res.render("../views/users/singup.ejs")
})
.post("/", wrapAsync(async(req,res)=>{
    let {email,username,password,confirm}=req.body
    if(password==confirm){
        let data =new User({
            email,
            username,
        })
        User.register(data,password).then((data)=>{
            req.login(data,()=>{
                req.flash("success",`Welcome ${username} to the our Website🙏`)
                res.redirect("/index")
            })
        })
        .catch((e)=>{
            req.flash("error2",e.message)
            res.redirect("/singup")
        })
    }
    else{
        req.flash("error2","Password Not Match")
        res.redirect("/singup")
    }
 }))
module.exports=router;