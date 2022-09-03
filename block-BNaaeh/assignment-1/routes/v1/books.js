var express = require("express");
var router = express.Router();
var {
  getAllBooks,
  createBook,
  updateBook,
  getSingleBook,
  deleteBook,
} = require("../../controllers/v1/BooksController");
const Book = require("../../models/Book");

// GET /api/books - list of all books
router.get("/", getAllBooks);

// GET /api/books/:id - get single book
router.get("/:id", getSingleBook);

// POST /api/books - create a book
router.post("/", createBook);

// PUT /api/books/:id - update a book
router.put("/:id", updateBook);

// DELETE /api/books/:id - delete a book
router.delete("/:id", deleteBook);

module.exports = router;
