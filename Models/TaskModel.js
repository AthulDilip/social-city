const mongoose = require('mongoose');
const TaskSchema = require('../Schema/TaskSchema');


const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;