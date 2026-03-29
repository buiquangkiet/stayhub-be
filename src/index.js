const express = require("express");
const dotenv = require("dotenv");
const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8"]);

dotenv.config();

const connectDB = require("./utils/db");
connectDB();

const app = express();

const route = require("./routes");

app.use(express.json());

app.use("/api", route);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});