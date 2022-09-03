var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var booksSchema = new Schema(
  {
    title: String,
    summary: String,
    author: String,
    publisher: String,
    noOfPage: Number,
    commentsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", booksSchema);
