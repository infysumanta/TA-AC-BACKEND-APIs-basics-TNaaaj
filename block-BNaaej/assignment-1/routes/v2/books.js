var express = require("express");
var router = express.Router();
var {
  getAllBooks,
  createBook,
  updateBook,
  getSingleBook,
  deleteBook,
  addCategoryToBook,
  deleteCategoryToBook,
  editCategoryToBook,
  allCategories,
  booksByCategories,
  booksByAuthor,
  CountBooksByCategories,
  addTagsToBook,
  booksByTags,
  tagsAssending,
  tagsDecending,
  allBooksByTags,
  allTags,
} = require("../../controllers/v2/BooksController");

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

// Adding Category To Book
router.put("/addCategory/:bookId", addCategoryToBook);

// Deleting Category From Book
router.put("/deleteCategory/:bookId");

// Editing Category From Book
router.put("/editCategory/:bookId");

// List all categories
router.get("/allCategory");

// List all Books by categories
router.get("/booksByCategories/:category", booksByCategories);

// List all Books by author
router.get("/booksByAuthor/:author");

// Count all Books by categories
router.get("/countBooksByCategories/:category", CountBooksByCategories);

// Adding Tags To Book
router.put("/addTag/:bookId", addTagsToBook);

// Filter Books by Tags
router.get("/booksByTag/:tag", booksByTags);

// List all tags
router.get("/allTags", allTags);

// List all tags in ascending
router.get("/allTagsInDesc", tagsAssending);

// List all tags in descending
router.get("/allTagsInDesc", tagsDecending);

// Count all Books by Tags
router.get("/countBooksByTag/:tag", allBooksByTags);

module.exports = router;
