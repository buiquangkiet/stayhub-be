const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["empty", "occupied"],
        default: "empty",
    },
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);