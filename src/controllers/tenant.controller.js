const tenantService = require("../service/tenant.service");

const listTenant = async (req, res, next) => {
    try {
        const result = await tenantService.listTenant();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi danh sách Tenant", error: error.message });
    }
};

const createTenant = async (req, res, next) => {
    try {
        const { fullName, email, phone, address, idCard, roomId } = req.body;
        const result = await tenantService.createTenant(fullName, email, phone, address, idCard, roomId);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi tạo Khách thuê", error: error.message });
    }
};

const updateTenant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fullName, email, phone, address, idCard, roomId, avatar } = req.body;
        
        const result = await tenantService.updateTenant(id, fullName, email, phone, address, idCard, roomId, avatar);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi cập nhật Khách thuê", error: error.message });
    }
};

const softDeleteTenant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await tenantService.softDeleteTenant(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi xóa Tenant", error: error.message });
    }
};

const activateTenant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await tenantService.activateTenant(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi kích hoạt hồ sơ khách thuê", error: error.message });
    }
};

module.exports = { createTenant, updateTenant, softDeleteTenant, listTenant, activateTenant };
