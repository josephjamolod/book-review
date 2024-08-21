import { timeStamp } from "console";
import mongoose from "mongoose";

const bookReviewSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, "Please provide a book title"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
    },
    reviewText: {
      type: String,
      required: [true, "Please provide a review"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
    },
    userRef: {
      type: String,
      require: [true, "No User Refference"],
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookReviewSchema);
