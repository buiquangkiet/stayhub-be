const authService = require("../service/auth.service");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await authService.registerUser(name, email, password);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = { registerUser };