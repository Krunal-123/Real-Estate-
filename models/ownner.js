const mongoose=require("mongoose")
const ownSchema= mongoose.Schema({
    ownnerName:{
        type:String,
        required:true
    },
    ownnerEmail:{
        type:String,
        required:true
    }
})
const ownner=mongoose.model("ownner",ownSchema)
module.exports=ownner;