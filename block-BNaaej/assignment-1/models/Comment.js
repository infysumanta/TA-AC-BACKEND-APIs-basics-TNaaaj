var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentsSchema = new Schema(
  {
    content: String,
    author: String,
    bookRef: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentsSchema);
