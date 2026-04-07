const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
    },
    roomNumber: {
        type: String,
    },
    price: {
        type: Number,
    },
    variant: {
        type: [String],
    },
    imgSrc: {
        type: [String]  ,
    },
    status: {
        type: String,
        enum: ["empty", "occupied"],
        default: "empty",
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);