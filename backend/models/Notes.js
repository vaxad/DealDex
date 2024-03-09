const mongoose = require('mongoose');

const { Schema } = mongoose;
const notesSchema = new Schema({
    lectureId:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:false
    }
  });
  module.exports=mongoose.model('notes',notesSchema);