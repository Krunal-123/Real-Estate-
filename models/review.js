const mongoose=require("mongoose")
const { schema } = require("./schema")

const reviewSchema=new mongoose.Schema({
    image:[{
        filename:String,
        path:String
    }],
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})
const review=mongoose.model("review", reviewSchema)
module.exports=review