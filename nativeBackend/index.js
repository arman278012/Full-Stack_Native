require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Importing the routes
const userRoutes = require("./routes/userRoutes");

// Connecting the database
async function main() {
    try {
        if (!process.env.MONGO_URL) {
            console.error("MONGO_URL environment variable is not set");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Connection with database failed", error);
        process.exit(1);
    }
}
main();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// 404 Route Not Found Middleware
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 2080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
