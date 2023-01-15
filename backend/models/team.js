const mongoose  = require('mongoose')

const {Schema } = mongoose;

const team = new Schema({
    teamName:{ type : String , required : true , unique: true }, 
    teamMembers: [],
    projects: [],
    createdBy : {type: String, required:true, unique:true}
   
});

module.exports = mongoose.model('team', team);