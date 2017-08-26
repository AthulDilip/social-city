const mongoose = require('mongoose');
const UserSchema = require('../Schema/UserSchema');

UserSchema.statics.response = function(user) {
    let u = {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        locationName: user.locationName,
        latitude: user.latitude,
        longitude: use.longitude
    };

    return u;
}

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;