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
        loc: {
            type: {
                type:String
            },
            coordinates: [Number] 
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true
        },
        joinedUsers: {
            type: [Schema.Types.ObjectId],
            required: true
        }
    },
    {
        collection: 'task',
        autoIndex: true
    }
);

TaskSchema.index({loc: '2dsphere'});

module.exports = TaskSchema;