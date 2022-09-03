const Book = require("../../models/Book");
const Comment = require("../../models/Comment");

const saveComment = (req, res, next) => {
  let bookId = req.params.bookId;
  req.body.bookRef = bookId;
  Comment.create(req.body, (err, comment) => {
    if (err) {
      let errResponse = {
        message: "Something went wrong",
        error: err.message,
      };
      return res.status(500).json(errResponse);
    }
    Book.findByIdAndUpdate(
      bookId,
      {
        $push: {
          commentsId: comment.id,
        },
      },
      (err, book) => {
        if (err) {
          let errResponse = {
            message: "Something went wrong",
            error: err.message,
          };
          return res.status(500).json(errResponse);
        }
        let response = {
          message: "Book deleted successfully",
          data: {
            book: book,
            comments: comments,
          },
        };
      }
    );
  });
};
const getComment = function (req, res, next) {
  Comment.find({ bookRef: req.params.bookId }, (err, comments) => {
    res.status(200).json(comments);
  });
};

const updateComment = (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, comments) => {
    if (err) {
      let errResponse = {
        message: "Something went wrong",
        error: err.message,
      };
      return res.status(500).json(errResponse);
    }
    let response = {
      message: "Comment updated successfully",
      data: comments,
    };
    return res.status(200).json(response);
  });
};

const deleteComment = (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comments) => {
    if (err) {
      let errResponse = {
        message: "Something went wrong",
        error: err.message,
      };
      return res.status(500).json(errResponse);
    }

    Books.findByIdAndUpdate(
      comments.bookRef,
      {
        $pull: {
          commentsId: comment.id,
        },
      },
      (err, book) => {
        if (err) {
          let errResponse = {
            message: "Something went wrong",
            error: err.message,
          };
          return res.status(500).json(errResponse);
        }
        let response = {
          message: "Comments deleted successfully",
          data: comments,
        };
        return res.status(200).json(response);
      }
    );
  });
};

module.exports = {
  saveComment,
  getComment,
  updateComment,
  deleteComment,
};
