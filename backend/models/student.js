const mongoose  = require('mongoose')

const {Schema } = mongoose;

const student = new Schema({
    email:              { type : String , required : true , unique: true }, 
    password:           { type : String , required : true },
    name:               { type : String , required : true },
    role:               { type : String , enum:['default', 'PM', 'TST'], default:'default'}
});

module.exports = mongoose.model('student', student);