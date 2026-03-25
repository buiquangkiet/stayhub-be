const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./utils/db");
connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/user.route"));
app.use("/api/tenant", require("./routes/tenant.route"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});