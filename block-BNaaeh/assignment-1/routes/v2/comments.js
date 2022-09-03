var express = require("express");

const {
  saveComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../../controllers/v2/CommentController");

//POST /api/comments/:bookId - save a comment
router.post("/:bookId", () => saveComment);

//GET /api/comments/:bookId - get a comment for a book
router.post("/:bookId", () => getComment);

// PUT /api/comments/:id - update a comments
router.put("/:id", updateComment);

// DELETE /api/comments/:id - delete a comments
router.delete("/:id", deleteComment);

module.exports = router;
