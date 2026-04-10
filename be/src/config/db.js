import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME });
        console.log('MongoDB connected');

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
