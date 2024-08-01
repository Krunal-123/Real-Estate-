const express=require("express")
const router=express.Router()
const wrapAsync=require("../util/wrapAsync")
// const { isLogedin,saveURL } = require("../middleWare")
const {index}=require("../controller/index")

router.get("/",wrapAsync(index))
 module.exports=router;