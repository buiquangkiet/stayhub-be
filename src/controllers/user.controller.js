const authService = require("../service/auth.service");

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await authService.createUser(name, email, password, role);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const list = async (req, res) => {
    try {
        const users = await authService.list();
        res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await authService.login(email, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await authService.forgotPassword(email);
        res.status(200).json({ message: "Forgot password successful", user });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const changePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await authService.resetPassword(email, password);
        res.status(200).json({ message: "Password changed successfully", user });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const activateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await authService.activateUser(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Lỗi kích hoạt tài khoản", error: error.message });
    }
};

module.exports = { createUser, changePassword, login, forgotPassword, list, activateUser };