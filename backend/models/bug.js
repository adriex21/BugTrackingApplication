const mongoose  = require('mongoose')

const {Schema } = mongoose;

const bug = new Schema({
    projectID:{ type : String , required : true }, 
    repository:{ type : String , required : true },
    assignedTo : {type:String, default: "none"},
    status: {type:String, required:true, enum:['Open', 'Fixed']},
    severity: {type: Number, required:true},
    priority :{type: String, required:true, enum:['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
    description :{type:String, required:true},
    tester : {type:String, required:true},
    commits: [],
});

module.exports = mongoose.model('bug', bug);