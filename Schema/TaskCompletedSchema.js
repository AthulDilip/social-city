const Schema = require('mongoose').Schema;

const TaskSchema = new Schema(
    {
        taskId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        completedDates: {
            type: [Date],
            required: true
        }
    },
    {
        collection: 'taskCompleted',
        autoIndex: true
    }
);

module.exports = TaskSchema;