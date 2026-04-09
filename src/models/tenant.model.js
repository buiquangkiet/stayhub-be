const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    roomId: {
        type: String,
    },
    email: {
        type: String,
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
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("Tenant", tenantSchema);