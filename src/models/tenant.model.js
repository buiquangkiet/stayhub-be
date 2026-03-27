const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    idCard: {
        type: String,
        required: true,
    },
    deposit: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("Tenant", tenantSchema);