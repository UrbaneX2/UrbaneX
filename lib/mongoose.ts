import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("Missing MongoDB URL");
    throw new Error("Missing MongoDB URL");
  }

  // Check if we have an active connection
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connections[0].readyState === 1) {
    console.log("MongoDB connection already established");
    return;
  }

  // If currently connecting, wait for it to complete
  if (mongoose.connections[0].readyState === 2) {
    console.log("MongoDB connection in progress, waiting...");
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Connection timeout")), 20000);
      mongoose.connection.once('connected', () => {
        clearTimeout(timeout);
        resolve(true);
      });
    });
    console.log("MongoDB connection established");
    return;
  }

  try {
    // Disable buffering to fail fast instead of timeout
    mongoose.set('bufferCommands', false);
    mongoose.set('bufferTimeoutMS', 20000);

    await mongoose.connect(process.env.MONGODB_URL, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 20000,
      family: 4, // Force IPv4
    });

    isConnected = true;
    
    // Verify connection by pinging
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connected and verified");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }
};