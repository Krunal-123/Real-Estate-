const express=require("express")
const router=express.Router()
const wrapAsync=require("../util/wrapAsync")
const listings=require("../models/schema")
const ownner=require("../models/ownner")
const {isLogedin,}=require("../middleWare")
const multer = require("multer")
const {storage}=require("../Imgcloud")
const upload =multer({storage})
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const GeocodingClient = mbxGeocoding({ accessToken: process.env.MapToken });

router.get("/",isLogedin,(req,res)=>{
     res.render("../views/listing/create.ejs")
 })
.post("/add",upload.single('img'),wrapAsync(async(req,res)=>{
  let {title,description,price,location,category}=req.body
    let response= await GeocodingClient.forwardGeocode({
        query: location,
        limit: 1
      }).send()
        let {id,email,username}=res.locals.user;
        let own=await new ownner({
          ownnerName:username,
          ownnerEmail:email
        }).save()
        await listings({
          title,
          description,
          image:{
            filename:req.file.filename,
            path:req.file.path
          },
          price,
          location:response.body.features[0].place_name,
          ownner:own._id,
          geometry:response.body.features[0].geometry,
          category
        }).save()
        req.flash("success","Listing Added Successfully😊")
        res.redirect("/index")
 }))
 module.exports=router;