const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    console.log(user.role)
    return jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const createUser = async (name, email, password, role) => {
    const isExist = await User.findOne({ email });
    if (isExist) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    return { name: user.name, email: user.email, id: user._id, isActive: user.isActive };
};

const list = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email, isActive: true });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.isActive) {
            throw new Error("User is not active");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = generateToken(user);
        console.log("User logined", { name: user.name, email: user.email, role: user.role })
        return { name: user.name, email: user.email, role: user.role, token, _id: user._id };
    } catch (error) {
        throw error;
    }
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const token = generateToken(user);
    return { name: user.name, email: user.email, id: user._id, token };
}

const resetPassword = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return { name: user.name, email: user.email, id: user._id };
};


const activateUser = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("Không tìm thấy người dùng");
        }
        user.isActive = true;
        await user.save();
        return {
            message: "Kích hoạt tài khoản thành công",
            isActive: user.isActive,
            userId: user._id
        };
    } catch (error) {
        throw new Error(`Kích hoạt tài khoản thất bại: ${error.message}`);
    }
};

const updateUser = async (id, data) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("Không tìm thấy người dùng");

        if (data.name) user.name = data.name;
        if (data.email) user.email = data.email;
        if (data.role) user.role = data.role;
        if (data.isActive !== undefined) user.isActive = data.isActive;
        // Optionally update password if provided
        if (data.password) {
            user.password = await bcrypt.hash(data.password, 10);
        }
        await user.save();
        return { id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive };
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("Không tìm thấy người dùng");
        user.isActive = false;
        await user.save();
        return { message: "Đã xóa người dùng thành công" };
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser, resetPassword, forgotPassword, login, list, activateUser, updateUser, deleteUser };