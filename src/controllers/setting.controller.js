const settingService = require("../service/setting.service");

const get = async (req, res) => {
    try {
        const settings = await settingService.getSettings();
        res.status(200).json({ data: settings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const settings = await settingService.updateSettings(req.body);
        res.status(200).json({ message: "Settings updated successfully", data: settings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    get,
    update
};
