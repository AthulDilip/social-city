const Schema = require('mongoose').Schema;

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        days: {
            type: Number,
            required: true
        },
        locationName: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        collection: 'task',
        autoIndex: true
    }
);

module.exports = TaskSchema;