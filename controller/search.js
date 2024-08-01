const listings=require("../models/schema")
module.exports.search=async(req,res)=>{
    const search=req.body
    const data=await listings.find({title:search})
    res.redirect("/index",{data})
}