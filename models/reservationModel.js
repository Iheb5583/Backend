const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    coiffure: { type: Schema.Types.ObjectId, ref: 'Coiffure', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed','refused','cancelled_by_Client','Cancelled_by_Coiffure','done'],
        default: 'pending',
    },
});

const ReservationModel = mongoose.model('Reservation', reservationSchema);

module.exports = ReservationModel;
