const mongoose = require('mongoose');

const { Schema } = mongoose;
const lectureStudentSchema = new Schema({
    studentId:{
        type:String,
        required:true
    },
    lectureId:{
        type:String,
        required:true
    },
    attention:{
        type:Number,
        required:false
    },
    attended:{
        type:Number,
        required:false
    },
    doubts:{
        type:[String],
        required:false
    }
  });
  module.exports=mongoose.model('lectureStudent',lectureStudentSchema);