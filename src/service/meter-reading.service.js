const MeterReading = require("../models/meter-reading.model");
const Room = require("../models/room.model");

const create = async (roomId, oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter,) => {
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            throw error({
                message: "Room not found",
            });
        }

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const isExisted = await MeterReading.findOne({ roomId: roomId, month: currentMonth, year: currentYear });
        if (isExisted) {
            return  {message: "Meter reading already created", data: null}
        }

        const meterReading = await MeterReading.create({
            roomId,
            oldElectricMeter,
            newElectricMeter,
            oldWaterMeter,
            newWaterMeter,
        });
        return {message: "Meter reading created successfully", data: meterReading};
    } catch (error) {
        throw error({
            message: "Error creating meter reading",
            error: error.message,
        });
    }
}

const update = async (id, oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter, month, year) => {
    try {
        const meterReading = await MeterReading.findByIdAndUpdate(id, {
            oldElectricMeter,
            newElectricMeter,
            oldWaterMeter,
            newWaterMeter,
            month,
            year,
        }, { new: true });
        return meterReading;
    } catch (error) {
        throw error({
            message: "Error updating meter reading",
            error: error.message,
        });
    }
}

const getMeterReadingByRoomId = async (roomId) => {
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            throw error({
                message: "Room not found",
            });
        }
        const meterReading = await MeterReading.find({ roomId });
        return meterReading;
    } catch (error) {
        throw error({
            message: "Error getting meter reading",
            error: error.message,
        });
    }
}

module.exports = { create, update, getMeterReadingByRoomId };

