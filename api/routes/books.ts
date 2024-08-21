import express from "express";
import { createBook, getAllBooks } from "../controllers/books.controller";
const router = express.Router();

router.route("/get-all-books").get(getAllBooks);
router.route("/create-book").post(createBook);

export default router;
