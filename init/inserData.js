const mongoose=require("mongoose")
const initdata=require("./data")
const listing=require("../models/schema")
let run=async()=>{
   await mongoose.connect("mongodb://localhost:27017/RealEstate")
}
run().then(()=>{console.log("Connect DB Sucessfully")}).catch(()=>{console.log("ERROR: Not Connect With DB");})

listing.insertMany(initdata.data).then((res)=>{console.log(res)}).catch((e)=>{console.log(e)})