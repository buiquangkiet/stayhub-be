const Invoice = require("../models/invoice.model");
const Room = require("../models/room.model");
const Contract = require("../models/contract.model");
const MeterReading = require("../models/meter-reading.model");
const Setting = require("../models/setting.model");

const createInvoice = async (data) => {
    try {
        const { contractId, roomId, userId, status } = data;

        // chưa tạo chỉ số điện nước sẽ không được tạo hóa đơn
        // const isExistInvoice = Invoice.findOne({ roomId, contractId });
        // if (!isExistInvoice.) throw new Error("Chưa có hóa đơn cho hợp đồng này");
        
        // 1. Lấy thông tin phòng và hợp đồng
        const room = await Room.findById(roomId);
        if (!room) throw new Error("Không tìm thấy phòng");

        const contract = await Contract.findById(contractId);
        if (!contract) throw new Error("Không tìm thấy hợp đồng liên quan");

        // 2. Lấy đơn giá cấu hình
        let setting = await Setting.findOne();
        if (!setting) {
            setting = { 
                electricityPrice: 3500, 
                waterPrice: 15000, 
                wifiPrice: 100000, 
                trashPrice: 30000, 
                parkingPrice: 50000 
            };
        }

        // 3. Tính tiền điện nước từ chỉ số mới nhất (MeterReading)
        const meterReading = await MeterReading.findOne({ roomId }).sort({ createdAt: -1 });
        if (!meterReading) throw new Error("Không tìm thấy chỉ số điện nước");
        let electricityCost = 0;
        let waterCost = 0;
        if (meterReading) {
            const eUsage = (meterReading.newElectricMeter || 0) - (meterReading.oldElectricMeter || 0);
            const wUsage = (meterReading.newWaterMeter || 0) - (meterReading.oldWaterMeter || 0);
            electricityCost = Math.max(0, eUsage) * setting.electricityPrice;
            waterCost = Math.max(0, wUsage) * setting.waterPrice;
        }

        // 4. Tính tiền gửi xe (Ưu tiên lấy từ hợp đồng, nếu không có mới lấy từ phòng)
        const vCount = contract.vehicleCount !== undefined ? contract.vehicleCount : (room.vehicleCount || 0);
        const parkingCost = vCount * setting.parkingPrice;

        // 5. Tính phí dịch vụ (WiFi, Rác) - Dựa trên các dịch vụ đã chọn trong hợp đồng
        let serviceCost = 0;
        const currentServices = contract.services || room.services || [];
        
        if (currentServices.some(s => s.toLowerCase().includes("wifi") || s.toLowerCase().includes("internet"))) {
            serviceCost += setting.wifiPrice;
        }
        if (currentServices.some(s => s.toLowerCase().includes("rác") || s.toLowerCase().includes("dọn phòng"))) {
            serviceCost += setting.trashPrice;
        }

        // Ưu tiên giá thuê từ hợp đồng
        const roomPrice = contract.price || room.price || 0;
        const totalAmount = roomPrice + electricityCost + waterCost + parkingCost + serviceCost;

        const invoice = new Invoice({
            contractId,
            roomId,
            userId,
            roomPrice,
            electricityCost,
            waterCost,
            parkingCost,
            serviceCost,
            totalAmount,
            price: totalAmount, // Giữ lại để tương thích với code cũ
            status: status || "unpaid"
        });
        
        return await invoice.save();
    } catch (error) {
        throw error;
    }
};

const listInvoices = async () => {
    try {
        return await Invoice.find()
            .populate("roomId", "roomNumber")
            .populate("userId", "name email")
            .populate("contractId")
            .sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
};

const getInvoiceDetail = async (id) => {
    try {
        return await Invoice.findById(id)
            .populate("roomId")
            .populate("userId")
            .populate("contractId");
    } catch (error) {
        throw error;
    }
};

const updateInvoice = async (id, data) => {
    try {
        return await Invoice.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteInvoice = async (id) => {
    try {
        return await Invoice.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

const updateStatus = async (id, status) => {
    try {
        return await Invoice.findByIdAndUpdate(id, { status }, { new: true });
    } catch (error) {
        throw error;
    }
};

const listInvoicesByUser = async (userId) => {
    try {
        const invoices = await Invoice.find({ userId }).populate("roomId", "roomNumber");
        return invoices;
    } catch (error) {
        throw error;
    }
};

const getRoomByContractId = async (id) => {
    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            throw new Error('Không tìm thấy hợp đồng');
        }
        const room = await Room.findById(contract.roomId);
        return room;
    } catch (error) {
        throw error;
    }
};

const getUserByContractId = async (id) => {
    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            throw new Error('Không tìm thấy hợp đồng');
        }
        const user = await User.findById(contract.userId);
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createInvoice,
    listInvoices,
    getInvoiceDetail,
    updateInvoice,
    deleteInvoice,
    updateStatus,
    listInvoicesByUser,
    getRoomByContractId,
    getUserByContractId
};
