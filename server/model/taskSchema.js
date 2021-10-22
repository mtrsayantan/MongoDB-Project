const mongoose= require('mongoose');
const Schema = mongoose.Schema; 

const blogSchema = new Schema({
    Description:{
        type: String,
        required: true
    },
    Completed:{
        type: Boolean,
        required: true
    }
},{ timestamps: true });
const task = mongoose.model('Task', blogSchema);
module.exports = task;