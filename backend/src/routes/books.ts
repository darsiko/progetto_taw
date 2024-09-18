import express from "express";
import * as BooksController from "../controllers/books";

const router = express.Router();

router.get("/", BooksController.getBooks);

router.get("/:bookId", BooksController.getBook);

router.post("/", BooksController.createBook);

router.patch("/:bookId", BooksController.updateBook);

router.delete("/:bookId", BooksController.deleteBook);

export default router;