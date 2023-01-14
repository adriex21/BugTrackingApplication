const mongoose  = require('mongoose')

const {Schema } = mongoose;

const project = new Schema({
    projectName:{ type : String , required : true , unique: true }, 
    repository:{ type : String , required : true },
    projectMembers: [],
    bugs: [],
    testers: [],
    team : {type: String, required:true }
});

module.exports = mongoose.model('project', project);