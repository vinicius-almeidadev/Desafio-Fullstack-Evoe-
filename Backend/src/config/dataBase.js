import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

// Creating the Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,  // To disable SQL logs in the terminal
    }
);

try {
    sequelize.authenticate();
    console.log("DB connection has been established successfully.");
} catch(error) {
    console.log('Unable to connect to the database:', error);
} 

export default sequelize;
