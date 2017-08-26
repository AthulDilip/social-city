const mongoose = require('mongoose');
const TaskCompletedSchema = require('../Schema/TaskCompletedSchema');


const TaskCompletedModel = mongoose.model("TaskCompleted", TaskCompletedSchema);

module.exports = TaskCompletedModel;