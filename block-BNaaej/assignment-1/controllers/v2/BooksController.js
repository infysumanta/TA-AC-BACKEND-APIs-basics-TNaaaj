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
const addCategoryToBook = (req, res, next) => {
  const bookId = req.params.bookId;
  const category = req.body.category;
  V3Book.findByIdAndUpdate(
    bookId,
    { categories: { $push: category } },
    (err, book) => {
      if (err) return next(err);
      res.status(200).json({ book });
    }
  );
};
const deleteCategoryToBook = (req, res, next) => {
  const bookId = req.params.bookId;
  const category = req.body.category;
  V3Book.findByIdAndUpdate(
    bookId,
    { categories: { $pull: category } },
    (err, book) => {
      if (err) return next(err);
      res.status(200).json({ book });
    }
  );
};
const editCategoryToBook = (req, res, next) => {
  const bookId = req.params.bookId;
  const categoryToRemove = req.body.categoryToRemove;
  const categoryToAdd = req.body.categoryToAdd;
  V3Book.findByIdAndUpdate(
    bookId,
    { categories: { $pull: categoryToRemove, $push: categoryToAdd } },
    (err, book) => {
      if (err) return next(err);
      res.status(200).json({ book });
    }
  );
};
const allCategories = (req, res, next) => {
  V3Book.distinct("categories", (err, categories) => {
    if (err) return next(err);
    res.status(200).json({ categories });
  });
};
const booksByCategories = (req, res, next) => {
  const category = req.params.category;
  V3Book.find({ categories: { $in: [category] } }, (err, books) => {
    if (err) return next(err);
    res.status(200).json({ books });
  });
};
const booksByAuthor = (req, res, next) => {
  const author = req.params.author;
  V3Book.find({ author: author }, (err, books) => {
    if (err) return next(err);
    res.status(200).json({ books });
  });
};
const CountBooksByCategories = (req, res, next) => {
  const category = req.params.category;
  V3Book.aggregate(
    [
      { categories: { $in: [category] } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ],
    (err, count) => {
      if (err) return next(err);
      res.status(200).json({ count });
    }
  );
};
const addTagsToBook = (req, res, next) => {
  const bookId = req.params.bookId;
  const tag = req.body.tag;
  V3Book.findByIdAndUpdate(bookId, { tags: { $push: tag } }, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
};

const booksByTags = (req, res, next) => {
  const tag = req.params.tag;
  V3Book.find({ tags: { $in: [tag] } }, (err, books) => {
    if (err) return next(err);
    res.status(200).json({ books });
  });
};

const allTags = (req, res, next) => {
  V3Book.distinct("tags", (err, tags) => {
    if (err) return next(err);
    res.status(200).json({ tags });
  });
};
const tagsAssending = (req, res, next) => {
  const tags = V3Book.distinct("tags").aggregate([{ index: 1 }]);
  res.status(200).json({ tags });
};

const tagsDecending = (req, res, next) => {
  const tags = V3Book.distinct("tags").aggregate([{ index: -1 }]);
  res.status(200).json({ tags });
};

const allBooksByTags = (req, res, next) => {
  const tag = req.params.tag;
  V3Book.aggregate(
    [{ tags: { $in: [tag] } }, { $group: { _id: null, count: { $sum: 1 } } }],
    (err, count) => {
      if (err) return next(err);
      res.status(200).json({ count });
    }
  );
};

module.exports = {
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
};
