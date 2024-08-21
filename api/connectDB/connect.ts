const mongoose = require("mongoose");

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected!");
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export default connectDB;
