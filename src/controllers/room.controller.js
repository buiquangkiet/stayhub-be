const roomService = require("../service/room.service");

const createRoom = async (req, res) => {
    try {
        const { tenantId, roomNumber, price, type } = req.body;
        const room = await roomService.createRoom(tenantId, roomNumber, price, type);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getRoomById = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await roomService.getRoomById(roomId);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { roomNumber, price, type } = req.body;
        const room = await roomService.updateRoom(roomId, roomNumber, price, type);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const softDeleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await roomService.softDeleteRoom(roomId);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createRoom, getRoomById, updateRoom, softDeleteRoom };
