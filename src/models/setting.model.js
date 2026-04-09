const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    electricityPrice: {
        type: Number,
    },
    waterPrice: {
        type: Number,
    },
    wifiPrice: {
        type: Number,
    },
    trashPrice: {
        type: Number,
    },
    parkingPrice: {
        type: Number,
    },
    extraSetting: {
        type: [Object],
        default: [
            { name: "Rác sinh hoạt", defaultPrice: 30000, unit: "Phòng" },
            { name: "Internet Wifi", defaultPrice: 50000, unit: "Phòng" },
            { name: "Gửi xe máy", defaultPrice: 100000, unit: "Chiếc" },
        ],
    },
    amenities: {
        type: [String],
        default: [
            "Có gác",
            "Khu bếp",
            "Cửa sổ thông gió",
            "Vòi sen",
            "Ban công",
            "Máy lạnh",
            "Tủ lạnh",
            "Máy giặt"
        ],
    },
}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);