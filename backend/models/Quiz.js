const mongoose = require('mongoose');

const { Schema } = mongoose;
const quizSchema = new Schema({
    lectureId:{
        type:String,
        required:true
    },
    quiz: {
        type:[{
            question:String,
            options:[String],
            answer:String,
            topic:String
        }],
        require:false
    }
  });
  module.exports=mongoose.model('quiz',quizSchema);