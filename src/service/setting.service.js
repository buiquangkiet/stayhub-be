const Setting = require("../models/setting.model");

const getSettings = async () => {
    try {
        let setting = await Setting.findOne();
        if (!setting) {
            // Create default settings if none exist
            setting = await Setting.create({
                electricityPrice: 3500,
                waterPrice: 15000,
                wifiPrice: 100000,
                trashPrice: 30000,
                parkingPrice: 50000,
                extraSetting: [
                    { name: "Rác sinh hoạt", defaultPrice: 30000, unit: "Phòng" },
                    { name: "Internet Wifi", defaultPrice: 50000, unit: "Phòng" },
                    { name: "Gửi xe máy", defaultPrice: 100000, unit: "Chiếc" },
                ],
                amenities: [
                    "Có gác", "Khu bếp", "Cửa sổ thông gió", "Vòi sen", 
                    "Ban công", "Máy lạnh", "Tủ lạnh", "Máy giặt"
                ]
            });
        }
        return setting;
    } catch (error) {
        throw error;
    }
};

const updateSettings = async (data) => {
    try {
        let setting = await Setting.findOne();
        if (!setting) {
            return await Setting.create(data);
        }
        return await Setting.findByIdAndUpdate(setting._id, data, { new: true });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getSettings,
    updateSettings
};
