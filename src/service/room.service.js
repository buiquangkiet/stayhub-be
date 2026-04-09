const tenantService = require("./tenant.service");
const Room = require("../models/room.model");

const createRoom = async (roomNumber, price, maxOccupants, services, imgSrc) => {
    try {
        const room = await Room.create({ roomNumber, price, maxOccupants, services, imgSrc });
        return room;
    } catch (error) {
        throw new Error(error.message);
    }
}

const listAllRoom = async (filter = {}) => {
    try {
        // const rooms = await Room.find();
        const query = {}
        // query.isAvailable = true;
        if (filter.type) {
            query.type = filter.type;
        }
        if (filter.price) {
            query.price = filter.price;
        }
        if (filter.roomNumber) {
            query.roomNumber = filter.roomNumber;
        }
        if (filter.isAvailable) {
            query.isAvailable = filter.isAvailable;
        }
        const rooms = await Room.find(query);
        return rooms;
    } catch (error) {
        throw error({
            message: "Error listing rooms",
            error: error.message,
        });
    }
}

const getRoomById = async (roomId) => {
    try {
        const room = await Room.findById(roomId);
        return room;
    } catch (error) {
        throw error({
            message: "Error getting room",
            error: error.message,
        });
    }
}

const updateRoom = async (id, data) => {
    try {
        const room = await Room.findByIdAndUpdate(id, data, { new: true });
        return room;
    } catch (error) {
        throw new Error("Error updating room");
    }
}

const softDeleteRoom = async (id) => {
    try {
        const room = await Room.findByIdAndUpdate(id, { isAvailable: false }, { new: true });
        return room;
    } catch (error) {
        throw error({
            message: "Error updating room availability",
            error: error.message,
        });
    }
}

const detail = async (id) => {
    try {
        const room = await Room.findById(id);
        return room;
    } catch (error) {
        throw error({
            message: "Error getting room detail",
            error: error.message,
        });
    }
}

module.exports = { createRoom, listAllRoom, getRoomById, updateRoom, softDeleteRoom, detail };