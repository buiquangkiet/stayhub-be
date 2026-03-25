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
        const { name, email, password, phone, address} = req.body;
        const result = await tenantService.createTenant(name, email, password, phone, address);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi tạo Tenant", error: error.message });
    }
};

const updateTenant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password, phone, address, avatar } = req.body;
        
        const result = await tenantService.updateTenant(id, name, email, password, phone, address, avatar);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi cập nhật Tenant", error: error.message });
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

module.exports = { createTenant, updateTenant, softDeleteTenant, listTenant };
