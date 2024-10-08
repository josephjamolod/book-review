import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  getUserBooks,
  updateBook,
} from "../controllers/books.controller";
import { verifyToken } from "../utils/verifyToken";
const router = express.Router();

router.route("/get-all-books").get(getAllBooks);
router.route("/create-book/:id").post(verifyToken, createBook);
router.route("/delete-book/:id").delete(verifyToken, deleteBook);
router.route("/update-book/:id").patch(verifyToken, updateBook);
router.route("/get-user-books/:id").get(verifyToken, getUserBooks);
router.route("/get-single-book/:id").get(verifyToken, getSingleBook);

export default router;
