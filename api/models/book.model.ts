import mongoose from "mongoose";

const bookReviewSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, "Please provide a book title"],
      maxlength: [50, "BOok title must not exceed 50 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
      maxlength: [30, "Author must not exceed 30 characters"],
    },
    reviewText: {
      type: String,
      required: [true, "Please provide a review"],
      minlength: [10, "Review Text ust atleast 10 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      max: [5, "Must not exceed 5"],
      min: [1, "Must not be less than 1"],
    },
    userRef: {
      type: String,
      required: [true, "No User Reference"],
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookReviewSchema);
