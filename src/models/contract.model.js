const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    roomId: {
       type: String,
    },
    userId: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    // tiền phụ thu
    price: {
        type: Number,
    },
    deposit: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    actualOccupants: {
        type: Number,
        default: 1
    },
    vehicleCount: {
        type: Number,
        default: 0
    },
    services: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);