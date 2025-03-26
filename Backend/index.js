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
import dataBase from './config/dataBase.js';

// Models
import userModel from "./models/userModel.js"; // Just importing is enough to load the model

// Routes
import userRoutes from "./routes/userRoutes.js";
app.use("/user", userRoutes);

const port = process.env.PORT || 3000;

function monitorServer() {
    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
}

// Database sync with error handling
dataBase
    .sync()
    .then(monitorServer)
    .catch((error) => {
        console.error("❌ Database connection failed:", error);
    });
