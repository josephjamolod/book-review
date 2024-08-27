import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Book } from "../models/book.model";
import { UserType, type customRequest } from "../utils/verifyToken";
import mongoose from "mongoose";

interface BookType {
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: string;
}

export const createBook = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { bookTitle, author, reviewText, rating }: BookType = req.body;

  const { userId } = req.user!;
  if (userId !== req.params.id) {
    return next(errorHandler(403, "Unauthorize User"));
  }

  if (!bookTitle || !author || !reviewText || !rating) {
    return next(errorHandler(403, "Please provide all fields"));
  }
  try {
    const book = await Book.create({ ...req.body, userRef: userId });
    res.status(201).json(book);
  } catch (error) {
    return next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { searchTerm } = req.query;
  try {
    const queryObject: {
      author?: any;
    } = {};
    if (searchTerm) {
      queryObject.author = { $regex: searchTerm, $options: "i" };
    }

    const books = await Book.find(queryObject);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId }: UserType = req.user!;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(401, "Invalid ID format"));
  }
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(errorHandler(404, "Book cannot be found"));
  }
  if (book.userRef !== userId) {
    return next(errorHandler(401, "You can only delete your own book"));
  }
  try {
    await Book.findByIdAndDelete(book);
    res.status(200).json({ msg: "Book successfully Deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { bookTitle, author, reviewText, rating }: BookType = req.body;

  if (!bookTitle || !author || !reviewText || !rating) {
    return next(errorHandler(401, "All field must not be empty"));
  }

  const { userId }: UserType = req.user!;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(401, "Invalid ID format"));
  }
  const bookData = await Book.findById(req.params.id);
  if (!bookData) {
    return next(errorHandler(404, "book cannot be found"));
  }
  if (bookData.userRef !== userId) {
    return next(errorHandler(401, "You can only update your own book"));
  }
  try {
    const newBook = await Book.findByIdAndUpdate(
      bookData,
      {
        $set: {
          bookTitle,
          author,
          reviewText,
          rating,
        },
      },

      { new: true, runValidators: true }
    );
    res.status(200).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const getUserBooks = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user!;
  if (userId !== req.params.id) {
    return next(errorHandler(401, "Unauthorize User1"));
  }
  const { searchTerm } = req.query;
  try {
    const queryObject: {
      userRef: string;
      author?: any;
    } = { userRef: userId };
    if (searchTerm) {
      queryObject.author = { $regex: searchTerm, $options: "i" };
    }

    if (Object.keys(queryObject).length === 0) {
      return res.status(200).json([]);
    }
    const books = await Book.find(queryObject);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getSingleBook = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(401, "Listing not found"));
  }
  const { userId }: UserType = req.user!;
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(errorHandler(401, "Book not found"));
  }
  if (book.userRef !== userId) {
    return next(errorHandler(403, "You can only get your own book"));
  }
  try {
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
