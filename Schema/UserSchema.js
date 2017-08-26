const Schema = require('mongoose').Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        locationName: {
            type: String
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
    },
    {
        collection: 'users',
        autoIndex: true
    }
);

module.exports = UserSchema;