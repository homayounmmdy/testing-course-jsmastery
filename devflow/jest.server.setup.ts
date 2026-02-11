import "@testing-library/react";
import { connectDB, clearDB, disconnectDB, isDBConnected } from "./tests/config/db-integration";

jest.mock("@/auth", () => ({
  auth : jest.fn(() => Promise.resolve({user : null})),
}))

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
