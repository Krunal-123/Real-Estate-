const listings=require("../models/schema")
const review=require("../models/review")
const cloudinary = require('cloudinary').v2

module.exports.post=(async(req,res)=>{
    let {id}=req.params
    let data=await listings.findById(id).populate("Review").populate("ownner")
    res.render("../views/listing/show",{data})
 })

 module.exports.updatePost=async(req,res)=>{ 
    let {id}=req.params
    let arr=req.files.map(d=>{
          return {filename:d.filename,path:d.path}      
    })
    let obj={
       image:arr,
       name:req.body.name,
       rating:Number(req.body.rating),
       comment:req.body.comment
    }
    let data=await listings.findById({_id:id})
    let rew=await review(obj).save()
    data.Review.push(rew._id)
    await listings.findByIdAndUpdate({_id:id},data)
    req.flash("success","Review Added")
     res.redirect(`/show/${id}`)
 }
module.exports.update=async(req,res)=>{
   let {id}=req.params
   let edit=await listings.findById(id)
   res.render("../views/listing/edit.ejs",{edit})
}
module.exports.deletePost=async(req,res)=>{
    let {id}=req.params
    let {filename}=req.body
    if (filename) {
      await cloudinary.uploader.destroy(filename)
    }
    let list= await listings.findById({_id:id}).populate("Review").populate("ownner")
    await review.deleteMany({_id:list.Review})
    await listings.deleteOne({_id:id})
    req.flash("error","Listing Deleted Succesfully!!")
    res.redirect("/index");
   }

module.exports.deleteReview=async(req,res)=>{
    let {id1,id2}=req.params
   let del=await review.findById({_id:id2})
   if (del.image.length>0) {
      let data=del.image.map(d=>d.filename)
      for(d of data){
         await cloudinary.uploader.destroy(d)
       }
    }
    await review.findByIdAndDelete({_id:id2})
    req.flash("error","Deleted Review")
    res.redirect(`/show/${id1}`)
 }