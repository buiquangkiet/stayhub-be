const meterReadingService = require("../service/meter-reading.service");

const create = async (req, res, next) => {
    try {
        const { roomId,oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter, month, year } = req.body;

        const result = await meterReadingService.create(roomId, oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter, month, year);
      
        return res.status(201).json({
            message: result.message,
            data: result.data
        });
    } catch (error) {
        return res.status(400).json({ message: "Error creating meter reading", error: error.message });
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter } = req.body;
        const result = await meterReadingService.update(id, oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter);
        return res.status(200).json({
            message: "Meter reading updated successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({ message: "Error updating meter reading", error: error.message });
    }
}

const getMeterReadingByRoomId = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const result = await meterReadingService.getMeterReadingByRoomId(roomId);
        return res.status(200).json({
            message: "Meter reading fetched successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({ message: "Error getting meter reading", error: error.message });
    }
}

module.exports = { create, update, getMeterReadingByRoomId };