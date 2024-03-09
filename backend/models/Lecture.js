const mongoose = require('mongoose');

const { Schema } = mongoose;
const lectureSchema = new Schema({
    classroomId:{
        type:String,
        required:true
    },
    transcript:{
        type:String,
        required:false
    },
    subject:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
  });
  module.exports=mongoose.model('lecture',lectureSchema);