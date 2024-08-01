const express=require("express")
const wrapAsync = require("../util/wrapAsync")
const router=express.Router()
const listings=require("../models/schema")
const {search}=require("../controller/search")

router.post("/",wrapAsync(search))
module.exports=router