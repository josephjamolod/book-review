const mongoose = require("mongoose");

const connectDB = (url: string) => {
  try {
    mongoose.connect(url);
    console.log("MongoDB connected!");
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export default connectDB;
