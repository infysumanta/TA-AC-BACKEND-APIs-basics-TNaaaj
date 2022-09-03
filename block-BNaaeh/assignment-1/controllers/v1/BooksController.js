const Book = require("../../models/Book");
const Comment = require("../../models/Comment");

const getAllBooks = function (req, res, next) {
  Book.find({}, (err, books) => {
    res.status(200).json(books);
  });
};

const createBook = (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) {
      let errResponse = {
        message: "Something went wrong",
        error: err.message,
      };
      return res.status(500).json(errResponse);
    }
    let response = {
      message: "Book created successfully",
      data: book,
    };
    return res.status(200).json(response);
  });
};

const getSingleBook = (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) {
      let errResponse = {
        message: "Something went wrong",
        error: err.message,
      };
      return res.status(500).json(errResponse);
    }
    res.status(200).json(book);
  });
};
const updateBook = (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    if (err) {
      let errResponse = {
        message: "Something went wrong",
        error: err.message,
      };
      return res.status(500).json(errResponse);
    }
    let response = {
      message: "Book updated successfully",
      data: book,
    };
    return res.status(200).json(response);
  });
};
const deleteBook = (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) {
      let errResponse = {
        message: "Something went wrong",
        error: err.message,
      };
      return res.status(500).json(errResponse);
    }
    let response = {
      message: "Book deleted successfully",
      data: book,
    };
    return res.status(200).json(response);
  });
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  getSingleBook,
  deleteBook,
};
