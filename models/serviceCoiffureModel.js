const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceCoiffureModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    note:{
        type: String,
        required: false,
    },
    coiffure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coiffure',
        required: true,
    },reduction:{
        type: Number,
        default:0.0
    }
});
const UserModel = mongoose.model('ServiceCoiffure',serviceCoiffureModel);
module.exports = UserModel;