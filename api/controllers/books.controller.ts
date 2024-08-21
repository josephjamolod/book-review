import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Book } from "../models/book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    bookTitle,
    author,
    reviewText,
    rating,
  }: { bookTitle: string; author: string; reviewText: string; rating: string } =
    req.body;
  if (!bookTitle || !author || !reviewText || !rating) {
    return next(errorHandler(403, "Please provide all fields"));
  }
  try {
    const book = await Book.create({ ...req.body });
    res.status(201).json({
      message: "Book Successfully created",
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryObject = {};
    const books = await Book.find(queryObject);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
