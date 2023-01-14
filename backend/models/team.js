const mongoose  = require('mongoose')

const {Schema } = mongoose;

const team = new Schema({
    teamName:{ type : String , required : true , unique: true }, 
    teamMembers: [],
    projects: [],
   
});

module.exports = mongoose.model('team', team);