const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    roomPrice: { type: Number },
    electricityCost: { type: Number },
    waterCost: { type: Number },
    serviceCost: { type: Number },
    parkingCost: { type: Number },
    totalAmount: { type: Number },
    price: { type: Number }, // Keep this for compatibility
    status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid",
    },
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);
