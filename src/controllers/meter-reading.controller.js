const meterReadingService = require("../service/meter-reading.service");

const create = async (req, res, next) => {
    try {
        const { roomId,oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter, month, year } = req.body;

        const result = await meterReadingService.create(roomId, oldElectricMeter, newElectricMeter, oldWaterMeter, newWaterMeter, month, year);
        
        if (result.data === null) {
            return res.status(400).json({
                message: "Chỉ được tạo 1 lần, vui lòng chỉnh lại chỉ số bên dưới !!!",
                data: null
            });
        }

        return res.status(201).json({
            message: "Thêm chỉ số thành công",
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

const listAll = async (req, res) => {
    try {
        const result = await meterReadingService.listAll();
        return res.status(200).json({
            message: "All meter readings fetched successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({ message: "Error listing meter readings", error: error.message });
    }
}

const deleteMeterReading = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await meterReadingService.deleteMeterReading(id);
        return res.status(200).json({
            message: "Meter reading deleted successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({ message: "Error deleting meter reading", error: error.message });
    }
}

module.exports = { create, update, getMeterReadingByRoomId, listAll, deleteMeterReading };