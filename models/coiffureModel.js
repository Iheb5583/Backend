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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      }],
      assessments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment',
      required: true,
    }],
});
const UserModel = mongoose.model('Coiffure',coiffureSchema);
module.exports = UserModel;