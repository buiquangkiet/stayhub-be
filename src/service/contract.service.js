const Contract = require('../models/contract.model');
const Room = require('../models/room.model');
const User = require('../models/user.model');


const createContract = async (roomId, userId, startDate, endDate, deposit, price, actualOccupants, vehicleCount, services) => {
    const room = await Room.findById(roomId);
    if (!room) {
        throw new Error('Room not found');
    }

    if (room.status !== 'empty') {
        throw new Error('Phòng này hiện không còn trống (Room is not available)');
    }

    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
        throw new Error('User not found');
    }

    const contract = new Contract({
        roomId,
        userId,
        startDate,
        endDate,
        deposit,
        price,
        actualOccupants,
        vehicleCount,
        services
    });

    const savedContract = await contract.save();

    room.status = 'occupied';
    room.isAvailable = false;
    room.tenantId = userId;
    await room.save();

    return savedContract;
};

// list contract
const listContract = async () => {
    // chỉ list hợp đồng còn active
    try {
        const contracts = await Contract.find({ status: 'active' }).populate('roomId').populate('userId');
        if (!contracts) {
            throw new Error('Contracts not found');
        }
        return contracts;
    } catch (error) {
        throw error;
    }
};

const listContractByUser = async (userId) => {
    try {
        const contracts = await Contract.find({ userId, status: 'active' }).populate('roomId');
        return contracts;
    } catch (error) {
        throw error;
    }
};

const getContract = async (id) => {
    try {
        return await Contract.findById(id);
    } catch (error) {
        throw error;
    }
};

const detailContract = async (id) => {
    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            throw new Error('Không tìm thấy hợp đồng');
        }
        return contract;
    } catch (error) {
        throw error;
    }
};

const updateContract = async (id, { roomId, userId, startDate, endDate, deposit, price, actualOccupants, vehicleCount, services }) => {
    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            throw new Error('Không tìm thấy hợp đồng');
        }
        if (roomId) {
            contract.roomId = roomId;
        }
        if (userId) {
            contract.userId = userId;
        }
        if (startDate) {
            contract.startDate = startDate;
        }
        if (endDate) {
            contract.endDate = endDate;
        }
        if (deposit) {
            contract.deposit = deposit;
        }
        if (price) {
            contract.price = price;
        }
        if (actualOccupants) {
            contract.actualOccupants = actualOccupants;
        }
        if (vehicleCount) {
            contract.vehicleCount = vehicleCount;
        }
        if (services) {
            contract.services = services;
        }
        await contract.save();
        return {
            message: 'Cập nhật hợp đồng thành công',
            contract
        };
    } catch (error) {
        throw error;
    }
};


const deleteContract = async (id) => {
    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            throw new Error('Không tìm thấy hợp đồng');
        }
        // set status thành inactive
        contract.status = 'inactive';
        await contract.save();

        // Giải phóng phòng sau khi hủy hợp đồng
        const room = await Room.findById(contract.roomId);
        if (room) {
            room.status = 'empty';
            room.isAvailable = true;
            room.tenantId = null;
            await room.save();
        }

        return {
            message: 'Xóa hợp đồng thành công và đã giải phóng phòng',
            contract
        };
    } catch (error) {
        throw error;
    }
};

// const getRoomByContractId = async (id) => {
//     try {
//         const contract = await Contract.findById(id);
//         if (!contract) {
//             throw new Error('Không tìm thấy hợp đồng');
//         }
//         const room = await Room.findById(contract.roomId);
//         return room;
//     } catch (error) {
//         throw error;
//     }
// };

// const getUserByContractId = async (id) => {
//     try {
//         const contract = await Contract.findById(id);
//         if (!contract) {
//             throw new Error('Không tìm thấy hợp đồng');
//         }
//         const user = await User.findById(contract.userId);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// };


module.exports = {
    createContract,
    getContract,
    updateContract,
    deleteContract,
    listContract,
    listContractByUser,
    detailContract,
    // getRoomByContractId,
    // getUserByContractId
};