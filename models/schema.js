const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename:String,
    path:String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  Review:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review"
    }
  ],
  ownner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ownner"
  },
geometry:{
  coordinates:{
    type:[Number]
  },
  type:{
    type:String,
  },
},
category:{
  type:String
}
});

const listings = mongoose.model("listings", listingSchema);
module.exports = listings;