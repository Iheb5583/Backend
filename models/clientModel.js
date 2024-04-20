const mongoose = require('mongoose');
const {Schema} = mongoose;
const clientSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: { type: String, required: false},
    lastName: { type: String, required: false},
    dateOfBirth: {type: Date,required: false},
    city: {type: String,required: false},
    address: {type: String,required: false},
    phoneNumber: { type: String, required: true },
});
const UserModel = mongoose.model('Client',clientSchema);
module.exports = UserModel;