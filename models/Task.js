const mongoose  = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending',
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'low'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}) 

module.exports = mongoose.model('Task',TaskSchema)