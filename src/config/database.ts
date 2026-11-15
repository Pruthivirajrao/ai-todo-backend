import mongoose from "mongoose";

const connectDataBase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connection successful");
  } catch (err) {
    console.log("Database connection failed");
    process.exit(1);
  }
};
export default connectDataBase