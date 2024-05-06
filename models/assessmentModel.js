const mongoose = require('mongoose');
const { Schema } = mongoose;

const assessmentModel = new Schema({
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    coiffure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coiffure',
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    }
});
const UserModel = mongoose.model('Assessment',assessmentModel);
module.exports = UserModel;