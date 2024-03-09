const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    standard: {
        type:String,
        required:false
    },
    subjects:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:false
    },
    timing_start:{
        type:Number,
        required:false
    },
    timing_end:{
        type:Number,
        required:false
    },
    contact:{
        type:Number,
        required: false
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
  });
  const User=mongoose.model('locuser',userSchema);
  module.exports=User;