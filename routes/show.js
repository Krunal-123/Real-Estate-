const express=require("express")
const router=express.Router()
const wrapAsync=require("../util/wrapAsync")
const { isLogedin } = require("../middleWare")
const multer  = require('multer')
const {storage}=require("../cloudConfig")
const upload =multer({storage})
const {post,updatePost,update,deletePost,deleteReview}=require("../controller/show")


// for render list
router.get("/:id",wrapAsync(post))

.get("/edit/:id",isLogedin,wrapAsync(update))
//  for Reviews
.post("/:id",isLogedin,upload.any("files"),wrapAsync(updatePost))

// for delete specific list
.delete("/post/:id/del",isLogedin,wrapAsync(deletePost))
//   for review delete
.delete("/review/:id1/:id2",isLogedin, wrapAsync(deleteReview))
 module.exports=router;