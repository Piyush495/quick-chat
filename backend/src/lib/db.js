import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const URI=process.env.MONGO_URI;
    if(!URI){
      throw new Error("MongoDB URI is missing");
    }
    await mongoose.connect(URI);
  } catch (error) {
    console.error("error connecting to MongoDB", error.message);
    process.exit(1); //1 means fail and 0 means pass
  }
};
