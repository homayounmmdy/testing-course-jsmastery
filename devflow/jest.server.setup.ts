import "@testing-library/react";
import { connectDB, clearDB, disconnectDB, isDBConnected } from "./tests/config/db-integration";

beforeAll(async () => {
  await connectDB();
}, 30000);

beforeEach(async () => {
  if (isDBConnected()) await clearDB();
}, 10000);

afterAll(async () => {
  await disconnectDB();
});

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDB();
  process.exit(0);
});
