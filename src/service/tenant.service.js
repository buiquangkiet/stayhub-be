const mongoose = require("mongoose");
const Tenant = require("../models/tenant.model");

const listTenant = async () => {
    try {
        const tenants = await Tenant.find({ isActive: true });
        if (!tenants) {
            throw new Error("Tenants not found");
        }
        return tenants;
    } catch (error) {
        throw new Error(`Failed to list tenants: ${error.message}`);
    }

};

const getTenantById = async (id) => {
    try {
        const tenant = await Tenant.find({ id });
        if (!tenant) {
            throw new Error("Tenant not found");
        }
        return tenant;
    } catch (error) {
        throw new Error(`Failed to get tenant by ID: ${error.message}`);
    }
};

const createTenant = async (fullName, email, phone, address, idCard, roomId) => {
    try {
        // Kiểm tra roomId nếu có gửi lên
        if (roomId && !mongoose.Types.ObjectId.isValid(roomId)) {
            throw new Error("Mã phòng (roomId) không hợp lệ");
        }

        const tenant = await Tenant.create({
            roomId: roomId || null,
            fullName,
            phone,
            address,
            email,
            idCard,
        });

        return {
            message: "Tạo khách thuê thành công",
            tenantId: tenant._id,
        }

    } catch (error) {
        throw new Error(`Tạo khách thuê thất bại: ${error.message}`);
    }
};

const updateTenant = async (id, fullName, email, phone, address, idCard, roomId, avatar) => {
    try {
        const tenant = await Tenant.findById(id);
        if (!tenant) {
            throw new Error("Không tìm thấy khách thuê");
        }

        if (fullName) tenant.fullName = fullName;
        if (email) tenant.email = email;
        if (phone) tenant.phone = phone;
        if (address) tenant.address = address;
        if (idCard) tenant.idCard = idCard;

        if (roomId) {
            if (!mongoose.Types.ObjectId.isValid(roomId)) {
                throw new Error("Mã phòng (roomId) không hợp lệ");
            }
            tenant.roomId = roomId;
        }

        if (avatar) tenant.avatar = avatar;

        await tenant.save();
        return {
            message: "Cập nhật khách thuê thành công",
            tenantId: tenant._id,
            fullName: tenant.fullName,
        };
    } catch (error) {
        throw new Error(`Cập nhật khách thuê thất bại: ${error.message}`);
    }
};

const softDeleteTenant = async (id) => {
    try {
        const tenant = await Tenant.findById(id);
        if (!tenant) {
            throw new Error("Không tìm thấy khách thuê");
        }
        tenant.isActive = false; // Xóa mềm
        await tenant.save();
        return {
            message: "Xóa khách thuê thành công",
            isActive: tenant.isActive,
            tenantId: tenant._id,
        };
    } catch (error) {
        throw new Error(`Xóa khách thuê thất bại: ${error.message}`);
    }
};

const activateTenant = async (id) => {
    try {
        const tenant = await Tenant.findById(id);
        if (!tenant) {
            throw new Error("Không tìm thấy hồ sơ khách thuê");
        }
        tenant.isActive = true;
        await tenant.save();
        return {
            message: "Kích hoạt hồ sơ khách thuê thành công",
            isActive: tenant.isActive,
            tenantId: tenant._id,
        };
    } catch (error) {
        throw new Error(`Kích hoạt hồ sơ khách thuê thất bại: ${error.message}`);
    }
};

module.exports = { createTenant, updateTenant, softDeleteTenant, listTenant, getTenantById, activateTenant };