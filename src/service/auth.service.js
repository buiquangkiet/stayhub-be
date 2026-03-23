const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (name, email, password) => {
    const isExist = await User.findOne({ email });
    if (isExist) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return { name: user.name, email: user.email, id: user._id };
};

module.exports = { registerUser };