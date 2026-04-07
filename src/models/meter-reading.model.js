const mongoose = require("mongoose");

const meterReadingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
    roomNumber: {
        type: String,
    },
    oldElectricMeter: {
        type: Number,
    },
    newElectricMeter: {
        type: Number,
    },
    oldWaterMeter: {
        type: Number,
    },
    newWaterMeter: {
        type: Number,
    },
    month: {
        type: Number,
        default: new Date().getMonth(),
    },
    year: {
        type: Number,
        default: new Date().getFullYear(),
    },
}, { timestamps: true });

module.exports = mongoose.model("MeterReading", meterReadingSchema);