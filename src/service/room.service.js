const tenantService = require("./tenant.service");
const Room = require("../models/room.model");

const createRoom = async (tenantId, roomNumber, price, type) => {
    try {
        tenantId = await tenantService.getTenantById(tenantId);
        if(!tenantId){
            throw new Error("Tenant not found");
        }
        const room = await Room.create({ tenantId, roomNumber, price, type });
        return room;
    } catch (error) {
        throw error({
            message: "Error creating room",
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

const updateRoom = async (roomId, roomNumber, price, type) => {
    try {
        const room = await Room.findByIdAndUpdate(roomId, { roomNumber, price, type }, { new: true });
        return room;
    } catch (error) {
        throw error({
            message: "Error updating room",
            error: error.message,
        });
    }
}

const softDeleteRoom = async (roomId) => {
    try {
        const room = await Room.findByIdAndUpdate(roomId, { isAvailable: false }, { new: true });
        return room;
    } catch (error) {
        throw error({
            message: "Error updating room availability",
            error: error.message,
        });
    }
}

module.exports = { createRoom, getRoomById, updateRoom, updateRoomAvailability };