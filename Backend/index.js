// Libraries
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

// App Configuration
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
import database from "./src/config/database.js"; // Just importing is enough to connect to the database

// Routes
import userRoutes from "./src/routes/user-routes.js";
app.use("/user", userRoutes);

const port = process.env.PORT || 3000;

function monitorServer() {
    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
}

// Database sync with error handling
database
    .sync()
    .then(monitorServer)
    .catch((error) => {
        console.error("❌ Database connection failed:", error);
    });
