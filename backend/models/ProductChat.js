const mongoose = require('mongoose');

const { Schema } = mongoose;
const userPdtSchema = new Schema({
    text:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
  });
  const ProductMap=mongoose.model('testproductmap',userPdtSchema);
  module.exports=ProductMap;