const contractService = require("../service/contract.service");



const listContract = async (req, res) => {
    try {
        const contracts = await contractService.listContract();
        return res.status(200).json({
            message: "Contracts fetched successfully",
            data: contracts
        });
    } catch (error) {
        return res.status(400).json({ message: "Error fetching contracts", error: error.message });
    }
};

const createContract = async (req, res, next) => {
    try {
        const { roomId, userId, startDate, endDate, deposit, price, actualOccupants, vehicleCount, services } = req.body;
        const contract = await contractService.createContract(roomId, userId, startDate, endDate, deposit, price, actualOccupants, vehicleCount, services);
        return res.status(201).json({
            message: "Contract created successfully",
            data: contract
        });
    } catch (error) {
        return res.status(400).json({ message: "Error creating contract", error: error.message });
    }
};

const deleteContract = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contract = await contractService.deleteContract(id);
        // không cần trả message
        return res.status(200).json({
            data: contract
        });
    } catch (error) {
        return res.status(400).json({ message: "Error deleting contract", error: error.message });
    }
};

const updateContract = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contractService.updateContract(id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Error updating contract", error: error.message });
    }
};

const listContractByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const contracts = await contractService.listContractByUser(userId);
        return res.status(200).json({
            message: "Contracts fetched successfully",
            data: contracts
        });
    } catch (error) {
        return res.status(400).json({ message: "Error fetching user contracts", error: error.message });
    }
};

// const getRoomByContractId = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const room = await contractService.getRoomByContractId(id);
//         return res.status(200).json({
//             data: room.roomNumber
//         });
//     } catch (error) {
//         return res.status(400).json({ message: "Error fetching room", error: error.message });
//     }
// };

// const getUserByContractId = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await contractService.getUserByContractId(id);
//         return res.status(200).json({
//             data: user.name
//         });
//     } catch (error) {
//         return res.status(400).json({ message: "Error fetching user", error: error.message });
//     }
// };

module.exports = { listContract, createContract, deleteContract, updateContract, listContractByUser };
