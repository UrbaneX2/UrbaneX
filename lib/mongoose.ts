import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("Missing MongoDB URL");
    throw new Error("Missing MongoDB URL");
  }

  // Check if we have an active connection
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 15000, // Increase timeout for serverless
      socketTimeoutMS: 45000,
    });

    isConnected = true; 
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};