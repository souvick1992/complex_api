const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");




const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
connectDB();

const app = express();



app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
