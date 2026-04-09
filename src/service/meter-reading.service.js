const MeterReading = require("../models/meter-reading.model");
const Room = require("../models/room.model");

const create = async (roomId, oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter) => {
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error("Room not found");
        }

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const isExisted = await MeterReading.findOne({ roomId: roomId, month: currentMonth, year: currentYear });
        
        if (isExisted) {
            return { message: "Meter reading already created", data: null }
        }
        const meterReading = await MeterReading.create({
            roomId,
            roomNumber: room.roomNumber,
            oldElectricMeter,
            newElectricMeter,
            oldWaterMeter,
            newWaterMeter,
            month: currentMonth,
            year: currentYear
        });
        return { message: "Meter reading created successfully", data: meterReading };
    } catch (error) {
        throw new Error(`Error creating meter reading: ${error.message}`);
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
        throw new Error(`Error updating meter reading: ${error.message}`);
    }
}

const getMeterReadingByRoomId = async (roomId) => {
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error("Room not found");
        }
        const meterReading = await MeterReading.find({ roomId }).sort({ year: -1, month: -1 });
        return meterReading;
    } catch (error) {
        throw new Error(`Error getting meter reading: ${error.message}`);
    }
}

const listAll = async () => {
    try {
        return await MeterReading.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(`Error listing all meter readings: ${error.message}`);
    }
}

const deleteMeterReading = async (id) => {
    try {
        const meterReading = await MeterReading.findByIdAndDelete(id);
        return meterReading;
    } catch (error) {
        throw new Error(`Error deleting meter reading: ${error.message}`);
    }
}

module.exports = { create, update, getMeterReadingByRoomId, listAll, deleteMeterReading };
