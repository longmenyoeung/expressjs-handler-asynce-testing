const mongoose = require("mongoose");

//connection URL
const uri = process.env.MONGODB_ATLAS;

const connectDB = async () => {
    try {
        //Handle connection events
        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to MongoDB");
        });
        mongoose.connection.on("error", (err) => {
            console.error("Mongoose connection error :", err);
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected.");
        });
        //connect to url
        await mongoose.connect(uri, {dbName: 'express-mongodb'});
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;