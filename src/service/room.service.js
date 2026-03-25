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

module.exports = { createRoom };