const mongoose  = require('mongoose')

const {Schema } = mongoose;

const student = new Schema({
    email:              { type : String , required : true , unique: true }, 
    password:           { type : String , required : true },
    name:               { type : String , required : true },
    team:               { type : String , default: 'none' },
    projects: []
});

module.exports = mongoose.model('student', student);