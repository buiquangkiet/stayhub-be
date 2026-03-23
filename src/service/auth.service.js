const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (name, email, password) => {
    const isExist = await User.findOne({ email });
    if (isExist) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return { name: user.name, email: user.email, id: user._id };
};

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = generateToken(user);
    return { name: user.name, email: user.email, id: user._id, token };
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const token = generateToken(user);
    return { name: user.name, email: user.email, id: user._id, token };
}

const resetPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return { name: user.name, email: user.email, id: user._id };
};

module.exports = { createUser, generateToken, resetPassword, forgotPassword };