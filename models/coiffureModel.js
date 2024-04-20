const mongoose = require('mongoose');
const {Schema} = mongoose;
const coiffureSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: false,
      },
    firstName: { type: String, required: false},
    lastName: { type: String, required: false},
    city: {type: String,required: false},
    address: {type: String,required: false},
    phoneNumber: { type: String, required: false },
    services: [{
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
            required: true,
        }
    }],
});
const UserModel = mongoose.model('Coiffure',coiffureSchema);
module.exports = UserModel;