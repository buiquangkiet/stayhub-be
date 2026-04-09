const invoiceService = require("../service/invoice.service");

const create = async (req, res) => {
    try {
        const invoice = await invoiceService.createInvoice(req.body);
        res.status(201).json({ message: "Invoice created successfully", data: invoice });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const list = async (req, res) => {
    try {
        const invoices = await invoiceService.listInvoices();
        res.status(200).json({ data: invoices });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const detail = async (req, res) => {
    try {
        const invoice = await invoiceService.getInvoiceDetail(req.params.id);
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json({ data: invoice });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
        res.status(200).json({ message: "Invoice updated successfully", data: invoice });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await invoiceService.deleteInvoice(req.params.id);
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const invoice = await invoiceService.updateStatus(req.params.id, req.body.status);
        res.status(200).json({ message: "Status updated successfully", data: invoice });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listInvoicesByUser = async (req, res) => {
    try {
        const invoices = await invoiceService.listInvoicesByUser(req.params.userId);
        res.status(200).json({ data: invoices });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};

const getRoomByContractId = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await invoiceService.getRoomByContractId(id);
        return res.status(200).json({
            data: room.roomNumber
        });
    } catch (error) {
        return res.status(400).json({ message: "Error fetching room", error: error.message });
    }
};

const getUserByContractId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await invoiceService.getUserByContractId(id);
        return res.status(200).json({
            data: user.name
        });
    } catch (error) {
        return res.status(400).json({ message: "Error fetching user", error: error.message });
    }
};


module.exports = {
    create,
    list,
    detail,
    update,
    remove,
    updateStatus,
    listInvoicesByUser,
    getRoomByContractId,
    getUserByContractId
};
