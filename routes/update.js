
const express=require("express")
const router=express.Router()
const wrapAsync=require("../util/wrapAsync")
const listings=require("../models/schema")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const GeocodingClient = mbxGeocoding({ accessToken: process.env.MapToken });
const multer = require("multer")
const {storage}=require("../Imgcloud")
const upload=multer({storage})
const cloudinary = require('cloudinary').v2

router.patch("/:id",upload.single('img'),wrapAsync(async(req,res)=>{
    let {id}=req.params
    let {title,description,filename,path,price,location,category}=req.body
    if (filename) { 
      cloudinary.uploader.destroy(filename)
    }
    let response= await GeocodingClient.forwardGeocode({
      query: location,
      limit: 1
    }).send()
    await listings.findByIdAndUpdate(id,{
      title,
      description,
      image:req.file,
      price,
      location:response.body.features[0].place_name,
      geometry:response.body.features[0].geometry,
      category
    })
    req.flash("success","Update Successfully")
    res.redirect(`/show/${id}`)
  }))
 module.exports=router;

