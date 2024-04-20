const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceCoiffureSchema = new Schema({
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
    note:{
        type: String,
        required: false,
    }
});
const UserModel = mongoose.model('ServiceCoiffure',serviceCoiffureSchema);
module.exports = UserModel;