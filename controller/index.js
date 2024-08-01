const listings=require("../models/schema")
module.exports.index=async(req,res)=>{
    let inData=req.query
    let data={}
    if(inData){
        data=inData
    }
    let list=await listings.find(data)
    res.render("../views/listing/index.ejs",{list})
 }