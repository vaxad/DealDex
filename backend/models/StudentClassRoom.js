const mongoose = require('mongoose');

const { Schema } = mongoose;
const studentClassRoomSchema = new Schema({
    studentId:{
        type:String,
        required:true
    },
    classroomId:{
        type:String,
        required:true
    }
  });
  module.exports=mongoose.model('studentclassroom',studentClassRoomSchema);