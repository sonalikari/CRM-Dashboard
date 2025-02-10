const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// Middleware to serve uploaded documents
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
