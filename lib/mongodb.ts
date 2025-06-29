import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Conected to Mongo DB");
  } catch (error) {
    console.log("Errir connecting to MongoDB! ", error);
  }
};
