const roomService = require("../service/room.service");

const createRoom = async (req, res) => {
    try {
        const { roomNumber, price, variant, imgSrc } = req.body;
        const room = await roomService.createRoom(roomNumber, price, variant, imgSrc);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const listAllRoom = async (req, res) => {
    try {
        const filter = req.query;
        const rooms = await roomService.listAllRoom(filter);
        res.status(200).json(rooms);
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
        const { id } = req.params;
        const { roomNumber, price, type } = req.body;
        const room = await roomService.updateRoom(id, { roomNumber, price, type });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const softDeleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await roomService.softDeleteRoom(id);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const detail = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await roomService.detail(id);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createRoom, listAllRoom, getRoomById, updateRoom, softDeleteRoom, detail };
