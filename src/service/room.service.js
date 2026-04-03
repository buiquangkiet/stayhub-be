const tenantService = require("./tenant.service");
const Room = require("../models/room.model");

const createRoom = async (roomNumber, price, type, imgSrc) => {
    try {
        const room = await Room.create({ roomNumber, price, type, imgSrc });
        return room;
    } catch (error) {
        throw error({
            message: "Error creating room",
            error: error.message,
        });
    }
}

const listAllRoom = async () => {
    try {
        const rooms = await Room.find();
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

const updateRoom = async (id, { roomNumber, price, type }) => {
    try {
        const room = await Room.findByIdAndUpdate(id, { roomNumber, price, type }, { new: true });
        return room;
    } catch (error) {
        throw Error("Error updating room");
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