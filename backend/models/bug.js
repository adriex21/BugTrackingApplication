const mongoose  = require('mongoose')

const { Schema } = mongoose;

const bug = new Schema({
    projectID:{ type : String , required : true }, 
    repository:{ type : String , required : true },
    assignedTo : {type:String, default: "none"},
    status: {type:String, required:true, enum:['Open', 'Fixed'], default: 'Open'},
    severity: {type: Number, required:true, min: 1, max: 5},
    priority :{type: String, required:true, enum:['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
    description :{type:String, required:true},
    reporter : {type:String, required:true},
    commits: [],
});

module.exports = mongoose.model('bug', bug);