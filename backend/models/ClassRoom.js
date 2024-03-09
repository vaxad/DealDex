const mongoose = require('mongoose');

const { Schema } = mongoose;
const classRoomSchema = new Schema({
    creator:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    timing_start:{
        type:Number,
        required:false
    },
    timing_end:{
        type:Number,
        required:false
    },
    likes:{
        type:[String],
        required:false
    },
    comments:{
        type:[String],
        required:false
    },
    sentiment:{
        type:Number,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    },
    updatedAt:{
        type:Date,
        default:Date.now,
        required:true
    }
  });
  module.exports=mongoose.model('classroom',classRoomSchema);