const mongoose = require('mongoose');

const { Schema } = mongoose;
const quizReportSchema = new Schema({
    studentId:{
        type:String,
        required:true
    },
    quizId:{
        type:String,
        required:true
    },
    correct:{
        type:Number,
        required:false
    },
    incorrect:{
        type:Number,
        required:false
    },
    weakTopics:{
        type:[String],
        required:false
    }
  });
  module.exports=mongoose.model('quizReport',quizReportSchema);