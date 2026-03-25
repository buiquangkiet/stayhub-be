const Tenant = require("../models/tenant.model");

const listTenant = async () => {
    try {
        const tenants = await Tenant.find();
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
        const tenant = await Tenant.find({id});
        if (!tenant) {
            throw new Error("Tenant not found");
        }
        return tenant;
    } catch (error) {
        throw new Error(`Failed to get tenant by ID: ${error.message}`);
    }
};

const createTenant = async (name, email, password, phone, address) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const tenant = await Tenant.create([{
            name,
            phone,
            address
        }], { session });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create([{
            name,
            email,
            password: hashedPassword,
            tenantId: tenant[0]._id,
            role: "owner"
        }], { session });

        await session.commitTransaction();

        const token = generateToken(user[0]);

        return {
            message: "Register success",
            token
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;
    }
};

const updateTenant = async (id, name, email, password, phone, address) => {
    try {
        const tenant = await Tenant.findById(id);
        if (!tenant) {
            throw new Error("Tenant not found");
        }
        
        if (name) tenant.name = name;
        if (email) tenant.email = email;
        if (password) tenant.password = password;
        if (phone) tenant.phone = phone;
        if (address) tenant.address = address;
        
        await tenant.save();
        return {
            message: "Tenant updated successfully",
            tenantId: tenant._id,
            name: tenant.name,
        };
    } catch (error) {
        throw new Error(`Failed to update tenant: ${error.message}`);
    }
};

const softDeleteTenant = async (id) => {
    try {
        const tenant = await Tenant.findById(id);
        if (!tenant) {
            throw new Error("Tenant not found");
        }
        tenant.isActive = false; // Xóa mềm
        await tenant.save();
        return {
            message: "Tenant deleted successfully",
            isActive: tenant.isActive,
            tenantId: tenant._id,
        };
    } catch (error) {
        throw new Error(`Failed to delete tenant: ${error.message}`);
    }
};

module.exports = { createTenant, updateTenant, softDeleteTenant, listTenant, getTenantById };