import mongoose from "mongoose";
import { env } from "./env";

const connectDataBase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Database connection successful");
  } catch (err) {
    console.log("Database connection failed");
    process.exit(1);
  }
};
export default connectDataBase;
