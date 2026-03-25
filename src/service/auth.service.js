const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    console.log(user.role)
    return jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const createUser = async (name, email, password, role) => {
    const isExist = await User.findOne({ email });
    if (isExist) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role: role || "customer" });

    return { name: user.name, email: user.email, id: user._id };
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
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
        return { name: user.name, email: user.email, token };
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


module.exports = { createUser, resetPassword, forgotPassword, login };