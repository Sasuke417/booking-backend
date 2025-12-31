const moongoose = require('mongoose');

const bookingSchema = new moongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
});

module.exports = moongoose.model('Booking', bookingSchema);