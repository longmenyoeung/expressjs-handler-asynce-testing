const mongoose = require("mongoose");

//connection URL
const uri = "mongodb+srv://lovenith2020_db_user:z2L9uGEiWRoFVsBN@cluster0.kybzamt.mongodb.net/?appName=Cluster0";

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