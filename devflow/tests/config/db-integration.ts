import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;
let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;
  mongoServer = await MongoMemoryServer.create();
  const uri = MongoMemoryServer.getUri();

  await mongoose.connect(uri, { dbName: "testingDB" });

  if (global.mongoose) {
    global.mongoose.conn = mongoose;
    global.mongoose.promise = Promise.resolve(mongoose);
  }

  isConnected = true;
  try {
  } catch (e) {
    console.error("Failed to connect to integration DB: ", e);
    throw e;
  }
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) return;

  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (mongoServer) {
      await mongoServer.stop();
    }

    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }

    isConnected = false;
  } catch (e) {
    console.error("Failed to disconnect from integration DB: ", e);
    throw e;
  }
}

export async function clearDB(): Promise<void> {
  if (!isConnected) {
    throw new Error("Database not  connected");
  }
  try {
    await mongoose.connection.dropDatabase();
  } catch (e) {
    console.error("Failed to clear the integration DB: ", e);
    throw e;
  }
}

export function isDBConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
